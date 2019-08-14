#include <nanogui/nanogui.h>

#include "../clothMesh.h"
#include "../misc/sphere_drawing.h"
#include "sphere.h"

using namespace nanogui;
using namespace CGL;

void Sphere::collide(PointMass &pm) {
  // TODO (Part 3): Handle collisions with spheres.
  Vector3D d = pm.position - origin;
  float dist_from_origin = (float)d.norm();
  d.normalize();
  if (dist_from_origin <= radius) {
    Vector3D tangentPoint = origin + (radius * d);
    pm.position = pm.last_position + (1.0f - friction)*(tangentPoint-pm.last_position);
  }

}

void Sphere::render(GLShader &shader) {
  // We decrease the radius here so flat triangles don't behave strangely
  // and intersect with the sphere when rendered
  m_sphere_mesh.draw_sphere(shader, origin, radius * 0.92);
}
