import { createDom } from '../utilities/dom';

/** News item node inside news list */
class NewsItem {
  /**
   * constructor - init detail
   *
   * @param  {object} props { onClick(will be trigger when the item
   * click), data(the news item data) }
   * @return {none}               constructor don't return anything
   */
  constructor(props) {
    this.props = props;
  }

  /**
   * onClick - item click handler, will call the props onClick func
   * and pass the event and news item data
   *
   * @param  {type} event item click event
   * @return {self}
   */
  onClick(event) {
    const { onClick, data } = this.props;
    onClick(event, data);
    return this;
  }

  /**
   * renderImg - render news item image
   *
   * @return {dom wrapper}  the image dom wrapper
   */
  renderImg() {
    const { data } = this.props;
    const container = createDom('div').setClass('news-item-img-container');
    const img = createDom('img')
      .setClass('news-item-img')
      .setAttr('src', data.img);
    return container.append(img);
  }

  /**
   * renderTitle - render the news item title
   *
   * @return {dom wrapper}  the title dom wrapper
   */
  renderTitle() {
    const { data } = this.props;
    return createDom('h3').setClass('title')
      .innerHTML(`${data.id}. ${data.title}`);
  }

  /**
   * renderBody - render the news item body
   *
   * @return {dom wrapper}  the body dom wrapper
   */
  renderBody() {
    const { data } = this.props;
    return createDom('div').setClass('body').innerHTML(data.body);
  }

  /**
   * render - render the news item
   *
   * @return {dom wrapper}
   */
  render() {
    return createDom('div').setClass('news-item')
      .append(this.renderImg())
      .append(this.renderTitle())
      .append(this.renderBody())
      .on('click', this.onClick.bind(this));
  }
}

export default NewsItem;
