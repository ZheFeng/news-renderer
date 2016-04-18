import { createDom } from '../utilities/dom';

/** Single news item detail view */
class NewsDetail {
  /**
   * constructor - init detail
   *
   * @param  {object} props { onClick(will be trigger when the back button
   * click), data(the news item data) }
   * @return {none}               constructor don't return anything
   */
  constructor(props) {
    this.props = props;
  }

  /**
   * onBackClick - back button click handler, will call the props onClick func
   * and pass the event and news item data
   *
   * @param  {type} event button click event
   * @return {self}
   */
  onBackClick(event) {
    const { onClick, data } = this.props;
    onClick(event, data);
    return this;
  }

  /**
   * renderBackBtn - render back button
   *
   * @return {dom wrapper}  the back button dom wrapper
   */
  renderBackBtn() {
    return createDom('button').setClass('news-button')
      .innerHTML('Back')
      .on('click', this.onBackClick.bind(this));
  }

  /**
   * renderImg - render news item image
   *
   * @return {dom wrapper}  the image dom wrapper
   */
  renderImg() {
    const { data } = this.props;
    return createDom('img')
      .setClass('news-item-img')
      .setAttr('src', data.img);
  }

  /**
   * renderTitle - render the news item title
   *
   * @return {dom wrapper}  the title dom wrapper
   */
  renderTitle() {
    const { data } = this.props;
    return createDom('h3')
      .setClass('title')
      .innerHTML(data.title);
  }

  /**
   * renderBody - render the news item body
   *
   * @return {dom wrapper}  the body dom wrapper
   */
  renderBody() {
    const { data } = this.props;
    return createDom('div')
      .setClass('body')
      .innerHTML(data.body);
  }

  /**
   * render - render the detail of news item
   *
   * @return {dom wrapper}
   */
  render() {
    return createDom('div').setClass('news-detail')
      .append(this.renderBackBtn())
      .append(this.renderImg())
      .append(this.renderTitle())
      .append(this.renderBody());
  }
}

export default NewsDetail;
