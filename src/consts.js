export const API_URL="https://opendata-backend.herokuapp.com"
export const PROJECT_NAME="Tourism Open Data"
export const KEYS= {
    COUNTY: "County",
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
    "County":`PREFIX tourism: ${PREFIXES.TOURISM} SELECT DISTINCT ?value ?name WHERE {?id a ?obj . ?value tourism:countyName ?name. FILTER (?obj = tourism:County)}`,
    "Country":`PREFIX tourism: ${PREFIXES.TOURISM} SELECT DISTINCT ?value ?name WHERE {?id a ?obj . ?value tourism:countryName ?name. FILTER (?obj = tourism:Country)}`,
    "Activity":`PREFIX tourism: ${PREFIXES.TOURISM} SELECT DISTINCT ?value ?name WHERE {?value a ?obj . ?value tourism:name ?placeName. FILTER (?obj = tourism:ActivityPlace)}`,
    "Attraction": `PREFIX tourism: ${PREFIXES.TOURISM} SELECT DISTINCT ?value ?name WHERE {?value a ?obj . ?value tourism:placeName ?name. FILTER (?obj = tourism:Attraction)}`,
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
        question: "List 5 accommodations within 1km of a trail's starting point for the selected county.",
        displayTitle: "Query 1",
        query: (value) => {return `PREFIX math:<http://www.w3.org/2005/xpath-functions/math#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX tourism: ${PREFIXES.TOURISM}
        SELECT ?Trail_Name ?AccommodationName
        where{
        ?trail a tourism:Trail;
        tourism:trailName ?Trail_Name ;
        tourism:trailMetrics ?trailMetrics;
        tourism:trailCounty ?trailCounty ;
        tourism:startPoint ?trailStart .
        ?trailStart tourism:longitude ?long;
        tourism:latitude ?lat .
        FILTER(sameTerm(?trailCounty, <${value}>))
        ?accommodation a tourism:Accommodation ;
        tourism:placeName ?AccommodationName ;
        tourism:placeAddress ?AddressAccommodation .
        ?AddressAccommodation tourism:location ?geoLocAccommodation .
        ?geoLocAccommodation tourism:latitude ?accommodationLatitude ;
        tourism:longitude ?accommodationLongitude .
        BIND(xsd:decimal(?accommodationLongitude) - xsd:decimal(?long) AS ?distLong)
        BIND(xsd:decimal(?accommodationLatitude) - xsd:decimal(?lat) AS ?distLat)
        BIND(math:pow(math:sin(?distLat/2),2) + math:cos(xsd:decimal(?accommodationLatitude)) *
        math:cos(xsd:decimal(?lat)) * math:pow(math:sin(?distLong/2),2) AS ?a)
        BIND(2 * math:atan2(math:sqrt(?a),math:sqrt(1-?a)) AS ?c)
        BIND((6373 *11 * ?c) AS ?distance)
        FILTER(?distance < 1000)
        }
        ORDER BY ?Trail_Name ?AccommodationName
        LIMIT 5`
            },
        dataKey:KEYS.COUNTY,
        placeholder: 'Please select the County.'
    },
    2: {
        icon:"pe-7s-news-paper",
        question: "List all Accommodations within the same county in which a particular attraction is located.",
        displayTitle: "Query 2",
        query: (value) => {return `PREFIX tourism:${PREFIXES.TOURISM}
        SELECT ?name ?telephone ?url
        WHERE {
        ?attraction a tourism:Attraction ;
        tourism:placeAddress ?AddressAttraction.
        ?AddressAttraction tourism:county ?region .
        ?accommodation a tourism:Accommodation ;
        tourism:placeName ?name ;
        tourism:placeAddress ?AddressAccommodation .
        ?AddressAccommodation tourism:county ?regionAccommodation .
        OPTIONAL { ?accommodation tourism:url ?url } .
        OPTIONAL { ?accommodation tourism:placeTelephone ?telephone } .
        FILTER(sameTerm(?attraction, <${value}>))
        FILTER ( sameTerm(?region,?regionAccommodation) ) .
        }
        ORDER BY ?name`
        },
        dataKey:KEYS.ATTRACTION,
        placeholder: 'Please select the Attraction.'
    },
    3: {
        icon:"pe-7s-news-paper",
        question: "List accommodation of type 'LodgingBusiness' which are near the starting point for trails with climb is greater than 500m.",
        displayTitle: "Query 3",
        query: `PREFIX math:<http://www.w3.org/2005/xpath-functions/math#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX tourism: ${PREFIXES.TOURISM}
        SELECT ?Trail_Name ?climb ?trail_accommodation_distance ?AccommodationName ?Contact_No
        where{
        ?trail a tourism:Trail;
        tourism:trailName ?Trail_Name ;
        tourism:trailMetrics ?trailMetrics;
        tourism:startPoint ?trailStart .
        ?trailMetrics tourism:climb ?climb .
        ?trailStart tourism:longitude ?long;
        tourism:latitude ?lat .
        BIND(xsd:integer(?climb) AS ?trailClimb)
        FILTER(?trailClimb > 500)
        ?accommodation a tourism:Accommodation ;
        tourism:placeName ?AccommodationName ;
        tourism:accommodationType 'LodgingBusiness' ;
        tourism:placeAddress ?AddressAccommodation ;
        tourism:placeTelephone ?Contact_No .
        ?AddressAccommodation tourism:location ?geoLocAccommodation .
        ?geoLocAccommodation tourism:latitude ?accommodationLatitude ;
        tourism:longitude ?accommodationLongitude .
        BIND(xsd:decimal(?accommodationLongitude) - xsd:decimal(?long) AS ?distLong)
        BIND(xsd:decimal(?accommodationLatitude) - xsd:decimal(?lat) AS ?distLat)
        BIND(math:pow(math:sin(?distLat/2),2) + math:cos(xsd:decimal(?accommodationLatitude)) *
        math:cos(xsd:decimal(?lat)) * math:pow(math:sin(?distLong/2),2) AS ?a)
        BIND(2 * math:atan2(math:sqrt(?a),math:sqrt(1-?a)) AS ?c)
        BIND((6373 *11 * ?c) AS ?distance)
        FILTER(?distance < 200)
        BIND(str(ROUND(?distance)) AS ?trail_accommodation_distance)
        }
        ORDER BY ?trail_accommodation_distance`
    },
    4: {
        icon:"pe-7s-news-paper",
        question: "List all Accommodations which are in the vicinity of Bars.",
        displayTitle: "Query 4",
        query: `PREFIX tourism: ${PREFIXES.TOURISM}
        SELECT ?AccommodationName ?Accommodation_Phone ?ActivityName
        WHERE {
        ?accommodation a tourism:Accommodation ;
        tourism:placeName ?AccommodationName ;
        tourism:accommodationType "BedAndBreakfast";
        tourism:placeTelephone ?Accommodation_Phone;
        tourism:placeAddress ?AddressAccommodation .
        ?AddressAccommodation tourism:county ?AccommodationCounty .
        ?ActivityPlace a tourism:ActivityPlace;
        tourism:placeName ?ActivityName;
        tourism:placeAddress ?AddressActivity .
        ?AddressActivity tourism:county ?ActivityCounty .
        FILTER(sameTerm(?ActivityCounty,?AccommodationCounty))
        FILTER regex(?ActivityName, "Bar" , 'i')
        }`
    },
    5: {
        icon:"pe-7s-news-paper",
        question: "Show all Activities and Accommodation which have the exact same geographical location.",
        displayTitle: "Query 5",
        query: `PREFIX tourism: ${PREFIXES.TOURISM}
        SELECT ?AccommodationName ?AccomodationLatitude ?AccomodationLongitude ?ActivityName
        ?Contact_No
        WHERE {
        ?accommodation a tourism:Accommodation ;
        tourism:placeName ?AccommodationName ;
        tourism:placeAddress ?AddressAccommodation .
        ?AddressAccommodation tourism:location ?geoLocAccommodation .
        ?geoLocAccommodation tourism:latitude ?AccomodationLatitude ;
        tourism:longitude ?AccomodationLongitude .
        ?ActivityPlace a tourism:ActivityPlace;
        tourism:placeName ?ActivityName;
        tourism:placeAddress ?ActivityAddress.
        ?ActivityAddress tourism:location ?geoLocActivity .
        ?geoLocActivity tourism:latitude ?ActivityLatitude ;
        tourism:longitude ?ActivityLongitude .
        OPTIONAL { ?ActivityPlace tourism:placeTelephone ?Contact_No; } .
        FILTER ( sameTerm(?ActivityLongitude,?AccomodationLongitude) &&
        sameTerm(?AccomodationLatitude,?ActivityLatitude) ) .
        }
        ORDER BY ?AccommodationName`,
    },
    6: {
        icon:"pe-7s-news-paper",
        question: "List all the places to visit in the same county as the selected Trail.",
        displayTitle: "Query 6",
        query: (value) => {return `PREFIX tourism: ${PREFIXES.TOURISM}
        SELECT ?ActivityName ?URL ?Contact_No
        WHERE {
        ?trail a tourism:Trail;
        tourism:trailCounty ?TrailCounty.
        ?ActivityPlace a tourism:ActivityPlace;
        tourism:placeName ?ActivityName;
        tourism:placeTelephone ?Contact_No;
        tourism:url ?URL;
        tourism:placeAddress ?Address.
        ?Address tourism:county ?ActivityCounty.
        FILTER(sameTerm(?trail,<${value}>))
        FILTER(sameTerm(?ActivityCounty,?TrailCounty))
        }`
       },
       dataKey:KEYS.TRAIL,
       placeholder: 'Please select the Trail.'    
    },
    7: {
        icon:"pe-7s-news-paper",
        question: "Show distinct Accommodations which are CampGrounds located in the same county as a Trail for the selected county.",
        displayTitle: "Query 7",
        query: (value) => {return `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX tourism: ${PREFIXES.TOURISM}
        SELECT Distinct ?name ?telephone ?type
        WHERE {
        ?accomodation a tourism:Accommodation ;
        tourism:placeName ?name ;
        tourism:placeTelephone ?telephone ;
        tourism:accommodationType ?type;
        tourism:placeAddress ?loc .
        ?loc tourism:county ?locAcc .
        ?item a tourism:Trail ;
        tourism:trailName ?trailName ;
        tourism:trailCounty ?loc1 .
        FILTER(sameTerm(?locAcc, <${value}>))
        FILTER ( sameTerm(?loc1,?locAcc) )
        FILTER regex(?type, "Campground" , 'i').
        }
        ORDER BY ?name`
        },
        dataKey:KEYS.COUNTY,
        placeholder: 'Please select the County.'    
    },    
    8: {
        icon:"pe-7s-news-paper",
        question: "Show count of the number of circular trails within the radius of 2.5km in a selected county for different accommodations.",
        displayTitle: "Query 8",
        query: (value) => {return `PREFIX tourism: ${PREFIXES.TOURISM}
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX math:<http://www.w3.org/2005/xpath-functions/math#>
        SELECT ?AccommodationName (count(?format) as ?Number_Of_Circular_Trails)
        where{
        ?trail a tourism:Trail;
        tourism:trailName ?Trail_Name ;
        tourism:trailMetrics ?trailMetrics;
        tourism:trailCounty ?trailCounty ;
        tourism:trailFormat ?format;
        tourism:startPoint ?trailStart .
        ?trailStart tourism:longitude ?long;
        tourism:latitude ?lat .
        FILTER(sameTerm(?trailCounty, <${value}>))
        Filter(sameTerm(?format,"Circular"))
        ?accommodation a tourism:Accommodation ;
        tourism:placeName ?AccommodationName ;
        tourism:placeAddress ?AddressAccommodation .
        ?AddressAccommodation tourism:location ?geoLocAccommodation .
        ?geoLocAccommodation tourism:latitude ?lat1 ;
        tourism:longitude ?long1 .
        BIND(xsd:decimal(?long1) - xsd:decimal(?long) AS ?dlon)
        BIND(xsd:decimal(?lat1) - xsd:decimal(?lat) AS ?dlat)
        BIND(math:pow(math:sin(?dlat/2),2) + math:cos(xsd:decimal(?lat1)) * math:cos(xsd:decimal(?lat)) *
        math:pow(math:sin(?dlon/2),2) AS ?a)
        BIND(2 * math:atan2(math:sqrt(?a),math:sqrt(1-?a)) AS ?c)
        BIND((6373 *11 * ?c) AS ?d)
        FILTER(?d < 2500)
        }
        GROUP BY ?AccommodationName`
        },
        dataKey:KEYS.COUNTY,
        placeholder: 'Please select the County.'    

    },    
    9: {
        icon:"pe-7s-news-paper",
        question: "Accommodation and Activities having the same phone number, implying accommodations with activities.",
        displayTitle: "Query 9",
        query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX tourism: <http://www.example.org/tourism/>
        SELECT ?AccommodationName ?Accommodation_Phone ?ActivityName
        WHERE {
        ?accommodation a tourism:Accommodation ;
        tourism:placeName ?AccommodationName ;
        tourism:placeTelephone ?Accommodation_Phone.
        
        ?ActivityPlace a tourism:ActivityPlace;
        
        tourism:placeName ?ActivityName;
        tourism:placeTelephone ?Activity_Phone .
        FILTER(sameTerm(?Activity_Phone,?Accommodation_Phone))
        }`,
    },
    10: {
        icon:"pe-7s-news-paper",
        question: "List number of Activities which are in the same county as an 'Easy' Trail.",
        displayTitle: "Query 10",
        query: `PREFIX tourism: ${PREFIXES.TOURISM}
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        SELECT ?Trail_Name (count(?ActivityPlace) as ?Num_of_activity)
        WHERE{
        ?trail a tourism:Trail;
        tourism:trailName ?Trail_Name ;
        tourism:trailMetrics ?trailMetrics;
        tourism:trailCounty ?trailCounty .
        ?trailMetrics tourism:difficulty "Easy" .
        ?ActivityPlace a tourism:ActivityPlace;
        tourism:placeName ?ActivityName;
        tourism:placeAddress ?AddressActivity .
        ?AddressActivity tourism:county ?ActivityCounty .
        FILTER(sameTerm(?trailCounty, ?ActivityCounty))
        }
        GROUP BY(?Trail_Name)`,
    },
}
