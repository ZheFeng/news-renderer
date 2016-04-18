import componentRender from '../utilities/componentRender';
import { createDom } from '../utilities/dom';
import NewsItem from './NewsItem';

/** News list view */
class NewsList {
  /**
   * constructor - init detail
   *
   * @param  {object} props {
   * onClick: will be trigger when the item click,
   * list: the news list data,
   * SpinImage:spin image url by webpack,
   * disablePre: should disable pre button or not,
   * disableNext: should disable next button or not,
   * loading: should should spin or list,
   * onNextClick: will be trigger when the next button click,
   * onPreClick: will be trigger when the pre button click,
   * query {
     * numberPerPage: number of news item display per page
     * search: search text for news item
     * orderBy: order key name [id, title, body]
     * orderDesc: order desc or asc
     * }
   * onQueryChange: will be trigger when the one of the query data change,
   * }
   * @return {none}               constructor don't return anything
   */
  constructor(props) {
    this.props = props;
  }

  /**
   * goPre - go to pre page
   *
   * @return {self}
   */
  goPre() {
    const { disablePre } = this.props;
    if (!disablePre) {
      this.props.onPreClick();
    }
    return this;
  }

  /**
   * goNext - go to next page
   *
   * @return {self}
   */
  goNext() {
    const { disableNext } = this.props;
    if (!disableNext) {
      this.props.onNextClick();
    }
    return this;
  }

  /**
   * changeNumberPerPage - update number per page
   *
   * @param  {event} e input event include the number value
   * @return {self}
   */
  changeNumberPerPage(e) {
    this.props.onQueryChange({
      ...this.props.query,
      numberPerPage: parseInt(e.target.value, 10),
    });
    return this;
  }

  /**
   * changeSearch - update search text
   *
   * @param  {event} e input event include the search text
   * @return {self}
   */
  changeSearch(e) {
    this.props.onQueryChange({
      ...this.props.query,
      search: e.target.value,
    });
    return this;
  }

  /**
   * changeOrderBy - update OrderBy key
   *
   * @param  {event} e select event include the OrderBy key
   * @return {self}
   */
  changeOrderBy(e) {
    this.props.onQueryChange({
      ...this.props.query,
      orderBy: e.target.value,
    });
    return this;
  }

  /**
   * changeOrderDesc - trigger OrderDesc
   *
   * @return {self}
   */
  changeOrderDesc() {
    this.props.onQueryChange({
      ...this.props.query,
      orderDesc: !this.props.query.orderDesc,
    });
    return this;
  }

  /**
   * renderTitle - render the list title
   *
   * @return {dom wrapper}  the list title dom wrapper
   */
  renderTitle() {
    return createDom('h2').setClass('title').innerHTML('News List');
  }

  /**
   * renderOrderByDdl - reder order by select dom wrapper
   *
   * @param  {string} orderBy current orderBy key
   * @return {dom wrapper}  the order by select dom wrapper
   */
  renderOrderByDdl(orderBy) {
    const select = createDom('select')
      .on('change', this.changeOrderBy.bind(this));
    select.node.value = orderBy;
    const keys = ['id', 'title', 'body'];

    keys.forEach(key => {
      const option = createDom('option')
        .setAttr('value', key)
        .innerHTML(key);
      if (key === orderBy) {
        option.setAttr('selected', true);
      }
      select.append(option);
    });

    return select;
  }

  /**
   * renderToolbar - render toolbar include pre, next, search, order, number
   * per page
   *
   * @return {dom wrapper}  the toolbar dom wrapper
   */
  renderToolbar() {
    const { search, numberPerPage, orderBy, orderDesc } = this.props.query;
    const { disablePre, disableNext } = this.props;
    const toolbar = createDom('div').setClass('toolbar');
    const preBtn = createDom('button')
      .setClass(`news-button left ${disablePre ? 'disable' : ''}`)
      .innerHTML('Pre').on('click', this.goPre.bind(this));
    const nextBtn = createDom('button')
      .setClass(`news-button right ${disableNext ? 'disable' : ''}`)
      .innerHTML('Next').on('click', this.goNext.bind(this));

    const span = createDom('span').innerHTML('Number Per Page: ');
    const input = createDom('input')
      .setAttr('type', 'text')
      .setAttr('value', numberPerPage)
      .on('change', this.changeNumberPerPage.bind(this));


    const searchInput = createDom('input')
    .setAttr('type', 'text')
    .setAttr('placeholder', 'Search')
    .setAttr('value', search)
    .on('change', this.changeSearch.bind(this));


    const orderBtn = createDom('button').setClass('news-button')
      .innerHTML(orderDesc ? '&darr;' : '&uarr;')
      .on('click', this.changeOrderDesc.bind(this));

    const inputContainer = createDom('div')
      .append(span).append(input)
      .append(searchInput)
      .append(createDom('span').innerHTML(' Order'))
      .append(this.renderOrderByDdl(orderBy))
      .append(orderBtn);
    return toolbar.append(preBtn).append(nextBtn)
      .append(inputContainer);
  }

  /**
   * renderList - render the news list
   *
   * @return {dom wrapper}
   */
  renderList() {
    const ul = createDom('ul').setClass('list');
    const { list, onClick } = this.props;

    list.forEach(item => {
      const li = createDom('li').setClass('item');
      const itemEle = componentRender(NewsItem, { data: item, onClick });
      ul.append(li.append(itemEle));
    });

    return ul;
  }

  /**
   * render - render the news list
   *
   * @return {dom wrapper}
   */
  renderLoading() {
    return createDom('div')
      .setClass('news-loading')
      .append(createDom('img').setAttr('src', this.props.SpinImage));
  }

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { loading } = this.props;
    const container = createDom('div').setClass('news-list');
    container.append(this.renderTitle()).append(this.renderToolbar());

    if (loading) {
      return container.append(this.renderLoading());
    }
    return container.append(this.renderList());
  }
}

export default NewsList;
