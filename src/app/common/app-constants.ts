const appConstants = {
    errorCode: {
        Unauthorized: 401,
        UnprocessableEntity: 422,
        NotFound: 404,
        Forbidden: 403
    },
    routes: {
        LANDING: 'landing',
        LOGIN: 'login',
        QUESTION_SETS: 'questionSets',
        QUESTION_SET_DETAILS: 'questionSetDetails',
        TOPICS: 'topics',
        TOPIC_DETAILS: 'topicDetails',
        QUOTES: 'quotes',
        QUOTE_DETAILS: 'quoteDetails',
        NEW_QUOTE: 'newQuote',
        PRACTICE_SESSION: 'practiceSession',
        ANSWERS: 'answers',
        SESSION_DETAILS: 'sessionDetails',
    },
    ui: {
        PAGE_CONTAINER_CLASS: 'pageContent'
    },
    keyCodes: {
        TAB: 9
    }
};

export default appConstants;
