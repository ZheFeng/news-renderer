import State from '../State';
import ErrorHandler from '../ErrorHandler';
import componentRender from '../utilities/componentRender';
import { createDom } from '../utilities/dom';
import request from 'superagent';

import NewsList from './NewsList';
import NewsDetail from './NewsDetail';


const api = '/api/news';

/** News render app, render a news list and a single selected news item */
class App {
  /**
   * constructor - init app
   *
   * @param  {dom wrapper} appContainer the application dom wrapper container
   * @param  {string} SpinImage spin image url by webpack
   * @param  {number} numberPerPage number of news item display per page
   * @param  {number} offset the number start from to get the news item
   * @param  {string} search search text for news item
   * @param  {string} orderBy order key name [id, title, body]
   * @param  {bool} orderDesc order desc or asc
   * @return {none}               constructor don't return anything
   */
  constructor(
    appContainer,
    SpinImage,
    numberPerPage = 3,
    offset = 0,
    search = '',
    orderBy = 'id',
    orderDesc = false
  ) {
    /**
     * state of the app
     * @type {State}
     */
    this.state = new State();

    /**
     * the application dom wrapper container
     * @type {dom wrapper}
     */
    this.appContainer = appContainer;

    /**
     * spin image url by webpack
     * @type {string}
     */
    this.SpinImage = SpinImage;

    /**
     * number of news item display per page
     * @type {number}
     */
    this.numberPerPage = numberPerPage;

    /**
     * total number of news item
     * @type {number}
     */
    this.total = 0;

    /**
     * the number start from to get the news item
     * @type {number}
     */
    this.offset = offset;

    /**
     * search text for news item
     * @type {string}
     */
    this.search = search;

    /**
     * order key name [id, title, body]
     * @type {string}
     */
    this.orderBy = orderBy;

    /**
     * order desc or asc
     * @type {bool}
     */
    this.orderDesc = orderDesc;
    this.state.onChange(this.render.bind(this));
    this.loadData();
  }

  /**
   * loadData - load news from server
   *
   * @return {self}
   */
  loadData() {
    this.state.setListLoading(true);
    const query = {
      offset: this.offset,
      numberPerPage: this.numberPerPage,
      search: this.search,
      orderBy: this.orderBy,
      order: this.orderDesc ? 'desc' : 'asc',
    };
    request.get(api)
      .query(query)
      .end((err, res) => {
        if (err) {
          return ErrorHandler(err, {
            url: api,
            query,
          }, res);
        }
        this.total = res.body.total;
        return this.state.setListLoading(false).setList(res.body.entities);
      });
    return this;
  }

  /**
   * changeQuery - update the api query, will trigger the app rerender
   *
   * @param  {string} search      search text for news item
   * @param  {number} numberPerPage number of news item display per page
   * @param  {string} orderBy       order key name [id, title, body]
   * @param  {bool} orderDesc   order desc or asc
   * @return {self}
   */
  changeQuery({ search, numberPerPage, orderBy, orderDesc }) {
    this.numberPerPage = numberPerPage;
    if (this.numberPerPage < 1) {
      this.numberPerPage = 1;
    }
    this.search = search;
    this.orderBy = orderBy;
    this.orderDesc = orderDesc;
    this.offset = 0;
    this.loadData();
    return this;
  }

  /**
   * goPre - go to previous page
   *
   * @return {self}
   */
  goPre() {
    this.offset = parseInt(this.offset, 10) - parseInt(this.numberPerPage, 10);
    if (this.offset < 0) {
      this.offset = 0;
    }
    return this.loadData();
  }

  /**
   * goNext - go to next page
   *
   * @return {self}
   */
  goNext() {
    this.offset = parseInt(this.offset, 10) + parseInt(this.numberPerPage, 10);
    this.loadData();
  }

  /**
   * setItem - select news item to display detail
   *
   * @param  {event} e    select (click) event
   * @param  {object} item selected news item
   * @return {self}
   */
  setItem(e, item) {
    this.state.setItem(item);
    return this;
  }

  /**
   * clearItem - clear item selection, back to news list
   *
   * @return {self}
   */
  clearItem() {
    this.state.setItem(null);
  }

  /**
   * render - render the app into container
   *
   * @return {dom wrapper}  app dom wrapper
   */
  render() {
    const { listLoading, list, item } = this.state.get();
    this.appContainer.empty();

    const container = createDom('div').setClass('news-render-app');
    this.appContainer.append(container);

    if (item === null) {
      const { search, numberPerPage, orderBy, orderDesc } = this;
      const offset = parseInt(this.offset, 10);
      return container.append(componentRender(NewsList, {
        SpinImage: this.SpinImage,
        list,
        disablePre: offset < 1,
        disableNext: offset + parseInt(this.numberPerPage, 10) >= this.total,
        loading: listLoading,
        onNextClick: this.goNext.bind(this),
        onPreClick: this.goPre.bind(this),
        query: { search, numberPerPage, orderBy, orderDesc },
        onQueryChange: this.changeQuery.bind(this),
        onClick: this.setItem.bind(this),
      }));
    }
    return container.append(componentRender(NewsDetail, {
      data: item,
      onClick: this.clearItem.bind(this),
    }));

    // to async load script to avoid load everything at beginnign
    // code below can be used whick called "code split"

    // if (item === null) {
    //   return require.ensure([], (require) => {
    //     const NewsList = require('./NewsList').default;
    //     container.append(componentRender(NewsList, {
    //       SpinImage: this.SpinImage,
    //       list,
    //       loading: listLoading,
    //       onNextClick: this.goNext.bind(this),
    //       onPreClick: this.goPre.bind(this),
    //       numberPerPage,
    //       onNubmerPerPageChange: this.changeNubmerPerPage.bind(this),
    //       onClick: (e, data) => state.setItem(data),
    //     }));
    //   });
    // }
    // return require.ensure([], (require) => {
    //   const NewsDetail = require('./NewsDetail').default;
    //   container.append(componentRender(NewsDetail, {
    //     data: item,
    //     onClick: () => state.setItem(null),
    //   }));
    // });
  }
}

export default App;
