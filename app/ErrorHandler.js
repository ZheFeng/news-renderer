
function errorReport(msg, url, lineNo, columnNo, error) {
  /*eslint-disable */
  if (error) {
    console.error(error);
  }
  const reportItem = [`msg: ${msg}`, `url: ${url}`];
  if (lineNo) {
    reportItem.push(`lineNo: ${lineNo}`);
  }
  if (columnNo) {
    reportItem.push(`columnNo: ${columnNo}`);
  }
  console.error(`${reportItem.join(',')}`);
  /*eslint-disable */
}
function httpErrorReport(error, req, res) {
  /*eslint-disable */
  console.error(error);
  console.error('req', req);
  console.error('res', res);
  /*eslint-disable */
}

/**
 * ErrorHandler - Global error handler
 *
 * @param  {string | error} msg         If string, then deal as Uncaught Error.
 * If error, then deal as http(ajax) error
 * @param  {string | http request} urlOrReq    If Uncaught Error, then error
 * script url. If http error, then http request
 * @param  {string | http response} lineNoOrRes If Uncaught Error, then error
 * line number. If http error, then http response
 * @param  {string} columnNo    error column number, may not provide
 * by some browsers
 * @param  {error} error       error object, may not provide by some browsers
 * @return {bool}             skip browser error handler
 */
export default function ErrorHandler(
  msg, urlOrReq, lineNoOrRes, columnNo, error
) {
  if (typeof msg === 'string') {
    errorReport(msg, urlOrReq, lineNoOrRes, columnNo, error);
  } else {
    httpErrorReport(msg, urlOrReq, lineNoOrRes);
  }

  return false;
}
