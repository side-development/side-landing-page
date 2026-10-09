// A small procedural liquid surface; all drawing stays behind the card content.
export function createCardLiquid(card: HTMLElement, canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, powerPreference: "low-power" });
  if (!gl) return () => {};
  const vertex = gl.createShader(gl.VERTEX_SHADER)!;
  const fragment = gl.createShader(gl.FRAGMENT_SHADER)!;
  const program = gl.createProgram()!;
  const buffer = gl.createBuffer();
  const release = () => {
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    delete canvas.dataset.ready;
  };
  gl.shaderSource(vertex, "attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}");
  gl.shaderSource(fragment, `
    precision mediump float;
    uniform vec2 resolution;
    uniform float time;
    uniform vec4 trail[24];
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float noise(vec2 p){
      vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
      return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.)),f.x),f.y);
    }
    float fbm(vec2 p){
      float value=0.;float weight=.5;
      for(int i=0;i<4;i++){value+=weight*noise(p);p=mat2(.8,.6,-.6,.8)*p*2.03+3.1;weight*=.5;}
      return value;
    }
    void main(){
      vec2 uv=gl_FragCoord.xy/resolution;
      float aspect=resolution.x/resolution.y;
      vec2 p=uv*vec2(aspect,1.);
      vec2 warp=vec2(0.);float wake=0.;
      for(int i=0;i<24;i++){
        float age=time-trail[i].z;
        float life=exp(-age*2.5)*step(0.,age)*step(age,2.);
        vec2 delta=p-trail[i].xy*vec2(aspect,1.);
        float spread=.11+age*.035;
        float influence=exp(-dot(delta,delta)/(spread*spread))*life*trail[i].w;
        warp+=(delta+vec2(-delta.y,delta.x)*.3)*influence*.07;
        wake+=influence*.012;
      }
      p+=clamp(warp,vec2(-.008),vec2(.008));
      // Ambient flow evolves independently of pointer input, with no holds.
      p+=vec2(time*.025, sin(time*.12)*.06);
      vec2 flow=vec2(fbm(p*1.7+vec2(time*.025,0.)),fbm(p*1.7+vec2(5.2,-time*.018)));
      float ink=fbm(p*1.8+flow*1.5+vec2(time*.012,-time*.009));
      float ribbon=smoothstep(.25,.8,ink+wake*.12);
      vec3 color=mix(vec3(.995,.985,1.),vec3(.76,.66,.92),ribbon);
      color-=vec3(.035,.045,.015)*min(wake,.35);
      gl_FragColor=vec4(color,1.);
    }
  `);
  gl.compileShader(vertex);
  gl.compileShader(fragment);
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { release(); return () => {}; }
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, "resolution");
  const clock = gl.getUniformLocation(program, "time");
  const points = gl.getUniformLocation(program, "trail[0]");
  const trail = new Float32Array(24 * 4);
  for (let i = 0; i < 24; i++) trail[i * 4 + 2] = -100;
  let cursor = 0, time = 0, frame = 0, previous = 0, visible = false, lost = false;
  let lastPointer: { x: number; y: number } | null = null;
  const resize = () => {
    const bounds = card.getBoundingClientRect();
    const scale = Math.min(1, 960 / bounds.width);
    canvas.width = Math.max(1, Math.round(bounds.width * scale));
    canvas.height = Math.max(1, Math.round(bounds.height * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  const draw = (now: number) => {
    frame = requestAnimationFrame(draw);
    if (now - previous < 32) return;
    time += Math.min((now - previous) / 1000, .05);
    previous = now;
    gl.uniform2f(resolution, canvas.width, canvas.height);
    gl.uniform1f(clock, time);
    gl.uniform4fv(points, trail);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    canvas.dataset.ready = "true";
  };
  const update = () => {
    cancelAnimationFrame(frame);
    if (visible && !document.hidden && !lost) { previous = performance.now(); frame = requestAnimationFrame(draw); }
  };
  const follow = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = 1 - (event.clientY - bounds.top) / bounds.height;
    const distance = lastPointer ? Math.hypot(x-lastPointer.x,y-lastPointer.y) : .02;
    if (distance < .008) return;
    trail.set([x, y, time, Math.min(1.4, .65 + distance * 8)], cursor * 4);
    cursor = (cursor + 1) % 24;
    lastPointer = { x, y };
  };
  const leave = () => { lastPointer = null; };
  const onLost = (event: Event) => { event.preventDefault(); lost = true; delete canvas.dataset.ready; update(); };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
  const sizing = new ResizeObserver(resize);
  resize();
  observer.observe(card);
  sizing.observe(card);
  card.addEventListener("pointermove", follow);
  card.addEventListener("pointerleave", leave);
  document.addEventListener("visibilitychange", update);
  canvas.addEventListener("webglcontextlost", onLost);
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    sizing.disconnect();
    card.removeEventListener("pointermove", follow);
    card.removeEventListener("pointerleave", leave);
    document.removeEventListener("visibilitychange", update);
    canvas.removeEventListener("webglcontextlost", onLost);
    release();
  };
}
