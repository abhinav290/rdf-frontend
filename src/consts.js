export const QUERIES = {
    0: {
        icon:"pe-7s-pen",
        question:"",
        displayTitle: "Try Yourself",
        query: ""
    },
    1: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 1",
        query: "select ?x ?y where {?x a ?y.}",
    },
    2: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 2",
        query: "select ?x ?y where {?x a ?y.}",
    },
    3: {
        icon:"pe-7s-news-paper",
        question: "Display all instances of all classes.",
        displayTitle: "Query 3",
        query: "select ?x ?y where {?x a ?y.}",
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
        query: "PREFIX csv:<http://example.org/csv/> select ?name ?city where {?x csv:name ?name. ?x csv:hasAddress?y. ?y csv:inCity ?z. ?z csv:cityName ?city}",
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

export const API_URL="https://opendata-backend.herokuapp.com/"
export const PROJECT_NAME="Tourism Open Data"