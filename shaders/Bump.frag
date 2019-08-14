#version 330

uniform vec3 u_cam_pos;
uniform vec3 u_light_pos;
uniform vec3 u_light_intensity;

uniform vec4 u_color;

uniform sampler2D u_texture_3;
uniform vec2 u_texture_3_size;

uniform float u_normal_scaling;
uniform float u_height_scaling;

in vec4 v_position;
in vec4 v_normal;
in vec4 v_tangent;
in vec2 v_uv;

out vec4 out_color;

float h(vec2 uv) {
  // You may want to use this helper function...
  return texture(u_texture_3, uv).r;
}

void main() {
  // YOUR CODE HERE
  vec3 t = v_tangent.xyz;
  vec3 n = v_normal.xyz;
  vec3 b = cross(n, t);
  mat3 tbn = mat3(t, b, n);
  float w = u_texture_3_size.x;
  float h_val = u_texture_3_size.y;
  float u = v_uv.x;
  float v = v_uv.y;
  float dU = (h(vec2((u+1.0)/w, v)) - h(vec2(u,v))) * u_height_scaling * u_normal_scaling;
  float dV = (h(vec2(u,(v+1.0)/h_val)) - h(vec2(u,v))) * u_height_scaling * u_normal_scaling;
  vec3 no = vec3(-dU, -dV, 1.0);
  vec3 nd= vec3(tbn*no);



  float ka = 0.35;
  float kd = 0.65;
  float ks = 0.3;
  vec3 a_intensity = vec3(0.5,0.5,0.5);
  float p = 80.0;

  float r = distance(u_light_pos, v_position.xyz);
  vec3 l = u_light_pos - v_position.xyz;
  l = normalize(l);

  vec3 v_phong = u_cam_pos - v_position.xyz;
  v_phong = normalize(v_phong);
  vec3 bisector = (v_phong+l) / length(v_phong + l);

  out_color = vec4((ka*a_intensity+kd*(u_light_intensity/(r*r))*max(0.0, dot(nd, l))+ks*(u_light_intensity/(r*r))*pow(max(0.0, dot(nd, bisector)), p)), 1.0);

  // (Placeholder code. You will want to replace it.)
//  out_color = (vec4(1, 1, 1, 0) + v_normal) / 2;
//  out_color.a = 1;
}

