
/**
 * componentRender - render the component
 *
 * @param  {class} Component the component class
 * @param  {obj} props     properties
 * @return {dom obj}           a dom wrapper
 */
export default function componentRender(Component, props) {
  const _comp = new Component(props);
  return _comp.render();
}
