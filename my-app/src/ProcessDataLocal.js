const fs = require('fs');
const SerpApi = require('google-search-results-nodejs');
const apiKey = "f9a84aee31e2b95791ce1ab913ac4b3e81c2f1950f6230d1d3914a308684e1ac";

const keyword = "Artisanal and Small-Scale Gold Mining (ASGM): Management and Socioenvironmental Impacts in the Northern Amazon of Ecuador";

const { bibtex, parseBibFile } = require('bibtex');
const INCORRECT_ENTRY_TYPES = ['booklet', 'manual', 'mastersthesis', 'proceedings', 'unpublished'];
const APPROVED_PUBLISHERS = ['ACM', 'Association for Computing Machinery', 'IEEE', 'Institute of Electrical and Electronics Engineers', 'Routledge', 'Sage', 'Springer', 'Wiley', 'Elsevier', 'Emerald', 'Emerald Publishing', 'Taylor & Francis'];

function filter(bibtexData, entry, i) {
  let publisherExists = entry.getField('publisher');
  let type = entry.type;
  let pagesExists = entry.getField('pages');

  if (publisherExists) {
    let publisher = entry.getField('publisher').data.join('');
    for (let j = 0; j < APPROVED_PUBLISHERS.length; j++) {
      if (publisher.includes(APPROVED_PUBLISHERS[j])) {
        bibtexData[i]['status'] = 'Accepted';
      }
    }
  }

  for (let k = 0; k < INCORRECT_ENTRY_TYPES.length; k++) {
    if (type === INCORRECT_ENTRY_TYPES[k]) {
      bibtexData[i]['status'] = 'Rejected';
    }
  }

  if (pagesExists) {
    let pages = pagesExists.data.join('').split('--');
    if (pages[1] - pages[0] + 1 <= 3) {
      bibtexData[i]['status'] = 'Rejected';
    }
  }

  if (!bibtexData[i].hasOwnProperty('status')) {
    bibtexData[i]['status'] = 'Pending';
  }

  return bibtexData;
}

async function fetchArticles(keyword) {
  const response = await fetch("https://serpapi.com/search.json?engine=google_scholar&as_ylo=2022&num=20&start=0&q=\"" + keyword + "\"&api_key=" + apiKey);
  const results = await response.json();
  return results['organic_results'];
}

async function fetchLinks(data) {
  for (let index = 0; index < data.length; index++) {
    // appending bibtex links to results
    const response = await fetch(data[index]['inline_links']['serpapi_cite_link'] + "&api_key=" + apiKey);
    const results = await response.json();
    data[index]['bibtex_link'] = results["links"][0]["link"];
    delete data[index]['inline_links'];

    // extracting bibtex info
    let bibtex = await fetch(results["links"][0]["link"]);
    let text = await bibtex.text();
    let id = text.split('{')[1].split(',')[0]
    let bibFile = parseBibFile(text);
    let entry = bibFile.getEntry(id);
    data[index]['BibTex'] = text;

    // filtering bibtex info
    data = filter(data, entry, index);
    if (data[index]['status'] !== 'Rejected') {
        data[index]['BibTex'] = text;
    }
  }

  return data;
}

function saveData (jsonData, keyword){
  // stringify JSON Object
  let jsonContent = JSON.stringify(jsonData);
  console.log(jsonContent);
  
  fs.writeFile(keyword + ".json", jsonContent, 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }
      console.log("JSON file has been saved.");
  });
}

(async function () {
  const articles = await fetchArticles(keyword);
  const articleData = await fetchLinks(articles);
  console.log(articleData);
  saveData(articleData, keyword);
})()