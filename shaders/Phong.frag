#version 330

uniform vec4 u_color;
uniform vec3 u_cam_pos;
uniform vec3 u_light_pos;
uniform vec3 u_light_intensity;

in vec4 v_position;
in vec4 v_normal;
in vec2 v_uv;

out vec4 out_color;

void main() {
  // YOUR CODE HERE
  float ka = 0.35;
  float kd = 0.65;
  float ks = 0.8;
  vec3 a_intensity = vec3(0.5,0.5,0.5);
  float p = 20.0;

  float r = distance(u_light_pos, v_position.xyz);
  vec3 l = u_light_pos - v_position.xyz;
  l = normalize(l);

  vec3 v = u_cam_pos - v_position.xyz;
  v = normalize(v);
  vec3 h = (v+l) / length(v + l);

  //Ambient
  //out_color = vec4(ka*a_intensity, 1.0);

  //Specular
  //out_color = vec4((ks*(u_light_intensity/(r*r))*pow(max(0.0, dot(v_normal.xyz, h)), p)), 1.0);

  //Diffuse
  //out_color = vec4((kd*(u_light_intensity/(r*r))*max(0.0, dot(v_normal.xyz, l))), 1.0);

  //Blinn-Phong
  out_color = vec4((ka*a_intensity+kd*(u_light_intensity/(r*r))*max(0.0, dot(v_normal.xyz, l))+ks*(u_light_intensity/(r*r))*pow(max(0.0, dot(v_normal.xyz, h)), p)), 1.0);
  
  // (Placeholder code. You will want to replace it.)
//  out_color = (vec4(1, 1, 1, 0) + v_normal) / 2;
//  out_color.a = 1;
}

