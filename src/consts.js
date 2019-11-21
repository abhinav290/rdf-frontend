export const API_URL="https://opendata-backend.herokuapp.com"
export const PROJECT_NAME="Tourism Open Data"
export const KEYS= {
    CITY: "City",
    COUNTRY: "Country",
    ACTIVITY: "Activity",
    ATTRACTION: "Attraction",
    ACCOMMODATION:"Accommodation",
    TRAIL:"Trail",

}
export const PREFIXES = {
    TOURISM: '<http://www.example.org/tourism/>'
}
export const QUERY_MAP = {
    "City":`PREFIX tourism: ${PREFIXES.TOURISM} SELECT DISTINCT ?value ?name WHERE {?id a ?obj . ?value tourism:countyName ?name. FILTER (?obj = tourism:County)}`,
    "Country":`PREFIX tourism: ${PREFIXES.TOURISM} SELECT DISTINCT ?value ?name WHERE {?id a ?obj . ?value tourism:countryName ?name. FILTER (?obj = tourism:Country)}`,
    "Activity":`PREFIX tourism: ${PREFIXES.TOURISM} SELECT DISTINCT ?value ?name WHERE {?value a ?obj . ?value tourism:name ?placeName. FILTER (?obj = tourism:ActivityPlace)}`,
    "Attraction": `PREFIX tourism: tourism: ${PREFIXES.TOURISM} SELECT DISTINCT ?value ?name WHERE {?value a ?obj . ?value tourism:placeName ?name. FILTER (?obj = tourism:Attraction)}`,
    "Accommodation": `PREFIX tourism: ${PREFIXES.TOURISM} SELECT DISTINCT ?value ?name WHERE {?value a ?obj . ?value tourism:placeName ?name. FILTER (?obj = tourism:Accommodation)}`,
    "Trail":`PREFIX tourism: ${PREFIXES.TOURISM} SELECT DISTINCT ?value ?name WHERE {?value a ?obj . ?value tourism:trailName ?name. FILTER (?obj = tourism:Trail)}`,
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
        question: "List details of all the places that provide activities in the same county as the selected trail.",
        displayTitle: "Query 1",
        query: (value) => {return `PREFIX tourism: ${PREFIXES.TOURISM}
            SELECT ?ActivityName ?URL ?Contact_No
            WHERE {
                ?trail 		    a 						    tourism:Trail;
                                tourism:trailCounty 		?TrailCounty.
                ?ActivityPlace	a 						    tourism:ActivityPlace;
                                tourism:placeName 			?ActivityName;
                                tourism:placeTelephone		?Contact_No;
                                tourism:url					?URL;
                                tourism:placeAddress		?Address.
                ?Address	    tourism:county				?ActivityCounty.
                FILTER(sameTerm(?trail,<${value}>))
                FILTER(sameTerm(?ActivityCounty,?TrailCounty))
               }`
            },
        dataKey:KEYS.TRAIL,
        placeholder: 'Please select the Trail.'
    },
    2: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 2",
        query: (value) => {return `PREFIX tourism:${PREFIXES.TOURISM} select ?x ?y where {?x a ?y. FILTER(?x = <${value}>)}`},
        dataKey:KEYS.COUNTRY,
        placeholder: 'Please select the country.'
    },
    3: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 3",
        query: (value) => {return `PREFIX tourism:${PREFIXES.TOURISM} select ?x ?y where {?x a ?y. FILTER(?x = <${value}>)}`},
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
        query: `PREFIX tourism: ${PREFIXES.TOURISM} select ?name ?city where {?x tourism:name ?name. ?x tourism:hasAddress?y. ?y tourism:inCity ?z. ?z tourism:cityName ?city}`,
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
