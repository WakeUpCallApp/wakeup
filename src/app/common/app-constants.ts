const appConstants = {
    errorCode: {
        Unauthorized: 401,
        UnprocessableEntity: 422
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
    }
};

export default appConstants;
