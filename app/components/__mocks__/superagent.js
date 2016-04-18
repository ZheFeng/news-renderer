/*eslint-disable */
const data = [
  {
    id: 1,
    title: 'Work your phone from your sleeve',
    body: 'CONNECTED jacket swith touchscreen‐like sleeves,navigating gadgets by wiggling your fingers in the air.',
    img: '/static/images/3b43cfe1ce90f27503e6800fe9ed859a.jpg'
  },
  {
    id: 2,
    title: 'Google’s answer to Apple Pay',
    body: 'WHEN in doubt,copy whatever Apple is doing.That’s the approach Google appears to be taking with the...',
    img: '/static/images/Apple-Pay-main.png'
  },
  {
    id: 3,
    title: 'HP wants to turn your Mac into a 44-core Windows PC',
    body: 'If your Mac isn’t fast enough to edit 3D video, HP has a workaround to make it possible. HP’s new...',
    img: '/static/images/hp-vr-z840-100654241-primary.idge.jpg'
  },
  {
    id: 4,
    title: 'Apple rebuts DOJ’s appeal in N.Y. meth dealer’s iPhone case',
    body: 'Apple last week opposed the Department of Justice’s renewed demand that it assist investigators in...',
    img: '/static/images/iphone-security-100645858-primary.idge.jpg'
  },
  {
    id: 5,
    title: 'EU investigating Google’s contracts with phone makers',
    body: 'CONNECTED jacket swith touchscreen‐like sleeves,navigating gadgets by wiggling your fingers in the air...',
    img: '/static/images/margrethe_vestager-100623958-primary.idge.jpg'
  },
  {
    id: 6,
    title: 'HBO’s Silicon Valley returns this weekend',
    body: 'The last episode of Silicon Valley’s previous season began with the protagonist giving an uplifting...',
    img: '/static/images/silicon-valley-100656364-primary.idge.jpg'
  },
  {
    id: 7,
    title: 'Network analytics startup provides insight',
    body: 'Startup Nyansa Inc. today launched a SaaS-based IT network analytics service that can inspect, analyze...',
    img: '/static/images/founders-final-pr-100656162-primary.idge.jpeg'
  },
  {
    id: 8,
    title: 'Microsoft adds Android Wear support to Outlook for Android',
    body: 'How you feel about being able to check your email from your wrist probably depends largely on how you feel...',
    img: '/static/images/microsoft-outlook-100565586-primary.idge.png'
  },
  {
    id: 9,
    title: 'Chrome extensions will soon have to tell you what data they collect',
    body: 'Google is about to make it harder for Chrome extensions to collect your browsing data without letting you...',
    img: '/static/images/chrome-extensions-100656422-primary.idge.jpg'
  },
  {
    id: 10,
    title: 'Facebook at Work pushed to ‘later this year’',
    body: 'The long wait for Facebook at Work continues. The enterprise version of the world’s most popular social...',
    img: '/static/images/pushing-time-100656408-primary.idge.jpg'
  }
]
/*eslint-disable */
let numberPerPage = 0;
let offset = 0;
let error = new Error('test');
const mockSuperagent = {
  get() {
    return mockSuperagent;
  },
  query(q) {
    numberPerPage = q.numberPerPage;
    offset = q.offset;
    return mockSuperagent;
  },
  end(callback) {
    callback(error, { body: {
      entities: data.slice(offset, offset + numberPerPage),
      total: data.length,
    } });
    error = null;
  }
}

export default mockSuperagent;
