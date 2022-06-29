const header = 'Welcome to this wonderful example timeline.';
const footer = 'A footer goes here.';
const entries = [
  {
    "id": "cloudrunner.md",
    "title": "I Am Running In The Cloud",
    "body": "<p>An experiment for two Amazon Echoes. Each repeats a text to the other, introducing new errors on every repetition. A homage to Alvin Lucier, via Oulipo S+7.</p>\n",
    "links": [
      {
        "href": "http://prehensile.co.uk/blog/2018/02/17/running-in-the-cloud.html",
        "linkText": "prehensile.co.uk – I Am Running In The Cloud"
      }
    ],
    "categories": [
      "art",
      "hacking",
      "personal",
      "software",
      "amazon-echo",
      "language",
      "sound"
    ]
  },
  {
    "id": "singing.md",
    "title": "Singing Machines prototype",
    "body": "<p>A lockdown project - a sketch for an audio device which listens for others like it in its vicinity. If it hears any, it &#39;sings&#39; back to them.</p>\n",
    "links": [
      {
        "href": "https://vimeo.com/449757242",
        "linkText": "singing machines wip on Vimeo"
      }
    ],
    "categories": [
      "art",
      "hacking",
      "personal",
      "hardware",
      "sound"
    ]
  },
  {
    "id": "computers.md",
    "title": "Crystal Bennes, _When Computers Were Women_",
    "body": "<p><em>four hand-woven Jacquard wall hangings made of recycled cotton, organic cotton and lambswool, 70cm x 300cm each</em></p>\n<p>When Computers Were Women is a project connected to feminist critiques of physics, and stems from an invited residency at CERN (the European Organisation for Nuclear Research) in 2018.</p>\n<p>I helped Crystal ingest punch card data from photos she&#39;d taken at CERN and translate that data into a format that could be read by software driving the modern weaving machines.</p>\n",
    "links": [
      {
        "href": "https://www.crystalbennes.com/portfolio/when-computers-were-women/",
        "linkText": "When Computers Were Women | Crystal Bennes"
      }
    ],
    "date": "Thu Jan 20 2022",
    "categories": [
      "art",
      "artistic-collaborator",
      "personal",
      "software"
    ]
  },
  {
    "id": "emfcamp.md",
    "title": "Electromagnetic Field 2022",
    "body": "<p>I was one of the Art &amp; Installations Team Leads for EMF2022. Responsibilities included running and recruiting to the team, artist scouting and outreach, coordinating an Arts Council funding bid, curation, artist comms, and helping to set up and maintain installations and look after the artists during the festival.</p>\n",
    "links": [
      {
        "href": "https://www.emfcamp.org",
        "linkText": "Electromagnetic Field 2022"
      }
    ],
    "date": "Thu Jun 02 2022",
    "categories": [
      "art",
      "hacking",
      "personal"
    ]
  }
];

// Page details
const pageTitle = 'Static timeline generator'; // The title of the page that shows in the browser tab
const pageDescription = 'A super fancy timeline'; // The description of the page for search engines
const pageAuthor = 'Jane Doe'; // Your name

// DON'T EDIT BELOW THIS LINE! --------------------------------------------------------------------
const getFilters = (entries) => {
  const filters = new Set();
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if (Object.prototype.hasOwnProperty.call(entry, 'categories')) {
      for (var j = 0; j < entry.categories.length; j++) {
        filters.add(entry.categories[j]);
      }
    }
  }
  var filtersArray = [...filters];
  filtersArray.sort();
  return filtersArray;
};

const addCategoriesStringsToEntries = (entries) => {
  for (const entry of entries) {
    if (Object.prototype.hasOwnProperty.call(entry, 'categories')) {
      entry.categoriesString = entry.categories.join(',');
    }
  }
  return entries;
};

module.exports = {
  header,
  footer,
  entries: addCategoriesStringsToEntries(entries),
  filters: getFilters(entries),
  head: {
    title: pageTitle,
    description: pageDescription,
    author: pageAuthor,
  },
};
