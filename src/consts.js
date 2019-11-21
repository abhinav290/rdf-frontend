export const API_URL="https://opendata-backend.herokuapp.com"
export const PROJECT_NAME="Tourism Open Data"
export const KEYS= {
    CITY: "city",
    COUNTRY: "country",
    ACTIVITY: "activity",
    ATTRACTION: "attraction",
    ACCOMMODATION:"accommodation",
    TRAIL:"trail",

}
export const PREFIXES = {
    CSV: '<http://example.org/csv/>'
}
export const QUERY_MAP = {
    "city":`PREFIX csv: ${PREFIXES.CSV} SELECT DISTINCT ?value ?name WHERE {?id a ?obj . ?value csv:cityName ?name. FILTER (?obj = csv:City)}`,
    "country":`PREFIX csv: ${PREFIXES.CSV} SELECT DISTINCT ?value ?name WHERE {?id a ?obj . ?value csv:countryName ?name. FILTER (?obj = csv:Country)}`,
    "activity":`PREFIX csv: ${PREFIXES.CSV} SELECT DISTINCT ?value ?name WHERE {?value a ?obj . ?value csv:name ?name. FILTER (?obj = csv:ActivityPlace)}`,
    "attraction": `PREFIX csv: csv: ${PREFIXES.CSV} SELECT DISTINCT ?value ?name WHERE {?value a ?obj . ?value csv:name ?name. FILTER (?obj = csv:Attraction)}`,
    "accommodation": `PREFIX csv: ${PREFIXES.CSV} SELECT DISTINCT ?value ?name WHERE {?value a ?obj . ?value csv:name ?name. FILTER (?obj = csv:Accommodation)}`,
    "trail":`PREFIX csv: ${PREFIXES.CSV} SELECT DISTINCT ?value ?name WHERE {?value a ?obj . ?value csv:trailName ?name. FILTER (?obj = csv:Trail)}`,
}

export const QUERIES = {
    0: {
        icon:"pe-7s-pen",
        question:"",
        displayTitle: "Try Yourself",
        query: "",
    },
    1: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 1",
        query: (value) => {return `PREFIX csv:${PREFIXES.CSV} select ?x ?y where {?x a ?y. FILTER(?x = <${value}>)}`},
        dataKey:KEYS.CITY,
        placeholder: 'Please select the city.'
    },
    2: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 2",
        query: (value) => {return `PREFIX csv:${PREFIXES.CSV} select ?x ?y where {?x a ?y. FILTER(?x = <${value}>)}`},
        dataKey:KEYS.COUNTRY,
        placeholder: 'Please select the country.'
    },
    3: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 3",
        query: (value) => {return `PREFIX csv:${PREFIXES.CSV} select ?x ?y where {?x a ?y. FILTER(?x = <${value}>)}`},
        dataKey:KEYS.ACCOMMODATION,
        placeholder: 'Please select the accomodation.'
    },
    4: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 4",
        query: "select ?x ?y where {?x a ?y.}",
    },
    5: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 5",
        query: "select ?x ?y where {?x a ?y.}",
    },
    6: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 6",
        query: "select ?x ?y where {?x a ?y.}",
    },
    7: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 7",
        query: `PREFIX csv: ${PREFIXES.CSV} select ?name ?city where {?x csv:name ?name. ?x csv:hasAddress?y. ?y csv:inCity ?z. ?z csv:cityName ?city}`,
    },    
    8: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 8",
        query: "select ?x ?y where {?x a ?y.}",
    },    
    9: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 9",
        query: "select ?x ?y where {?x a ?y.}",
    },
    10: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 10",
        query: "select ?x ?y where {?x a ?y.}",
    },
}
