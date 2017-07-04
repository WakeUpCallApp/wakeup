/**
 * Populate DB with default data on user sign up
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Question = require('../api/question/question.model');
var QuestionController = require('../api/question/question.controller');
var QuestionSet = require('../api/questionSet/questionSet.model');
var DefaultQuestionSet = require('../api/questionSet/defaultQuestionSet.model');
var QuestionSetController = require('../api/questionSet/questionSet.controller');
var Topic = require('../api/topic/topic.model');
var QuoteController = require('../api/quote/quote.controller');
var Quote = require('../api/quote/quote.model');
var TopicController = require('../api/topic/topic.controller');

var questionSetId;
var defaultQuestions;
var defaultQuestionSet;
var defaultTopic;
/*Topic.update({
    _id: 1
}, {
    $addToSet: {
        'quoteList': [3, 1,11,12,13,14,15,16,17,25]
    }
}).exec();*/

/*var defaultQuestionSet = {
    "name": "Energy Questions",
    "practiceTimes": 0,
    "impact": 0,
    "isDefault": true
};
var defaultQuestions = [{
    "text": "How healthy am I? (physical energy)",
}, {
    "text": "How happy am I? (emotional energy)",
}, {
    "text": "How well can I focus on something? (mental energy)",
}, {
    "text": "Why am I doing this? (spiritual energy)",
}];

var defaultTopic = {
    "title": "The Energy Project",
    "description": "Energy is the capacity to do work at your best. We need to manage energy and time. Managing energy takes into account also renewing energy not only spending it. Humans require four sources of energy: physical energy (fitness, sleep, nutrition), emotional energy (feel a certain way), mental energy (focused attention for a certain period of time), spiritual energy (what matters to you, what serves others) ",
    'isDefault': true
};


createQuestionSet(defaultQuestionSet);*/

var defaultQuotes = [{
    "author": "Dalai Lama",
    "text": "Sleep is the best meditation",
    "source": "",
    "topic": 5
}, {
    "author": "",
    "text": "Sometimes the most productive thing one can do is to sleep",
    "source": "",
    "topic": 5
}, {
    "author": "",
    "text": "Before going to sleep every night, forgive everyone and sleep with a clean heart",
    "source": "http://quotesgram.com/best-sleep-quotes/#keUMzGgkKR",
    "date": "2015-11-18T10:00:18.539Z",
    "topic": 5
}, {
    "author": "",
    "text": "As the night gets darker, let your worries fade. Sleep peacefully, knowing you've done all you can do for today.",
    "source": "http://quotesgram.com/sleep-peacefully-quotes/#80LTSbtdCp",
    "date": "2015-11-18T10:01:47.749Z",
    "topic": 5
}, {
    "author": "David Lynch",
    "text": "The thing about meditation is: You become more and more you.",
    "source": "http://quotesgram.com/meditation-quotes/#wNzArIfIgA",
    "date": "2015-11-18T10:04:31.112Z",
    "topic": 5
}, {
    "author": "Ajahn Barahm",
    "text": "Meditation is like a gym in which you develop the powerful mental muscles of calm and insight",
    "source": "",
    "topic": 5
}, {
    "author": "",
    "text": "Every morning we are born again. What we do today is what matters most.",
    "source": "",
    "topic": 5
}];

//addQuotes(defaultQuotes);

function createQuestionSet(defaultQuestionSet) {
    QuestionSet.findOne({}, {}, {
        sort: {
            '_id': 'descending'
        }
    }, function(err, questionSet) {

        var latestQuestionSetId = questionSet ? questionSet._id : 0; // in the db is one based
        var questionSetId = latestQuestionSetId + 1;

        defaultQuestionSet._id = questionSetId;

        QuestionSet.create(defaultQuestionSet, function(err, questionSet) {
            if (err) {
                console.log(err);
            }
            addQuestions(defaultQuestions, questionSet._id);
            defaultTopic.questionSetList = [questionSet._id];
            createTopic(defaultTopic);
        });
    });
}

function addQuotes(defaultQuotes) {
    createQuote(defaultQuotes[0]).then(function() {
        createQuote(defaultQuotes[1]).then(function() {
            createQuote(defaultQuotes[2]).then(function() {
                createQuote(defaultQuotes[3]).then(function() {
                    createQuote(defaultQuotes[4]).then(function() {
                        createQuote(defaultQuotes[5]).then(function() {
                            createQuote(defaultQuotes[6]);
                        });
                    });
                });
            });
        });
    });
}

function addQuestions(defaultQuestions, questionSetId) {
    defaultQuestions = defaultQuestions.map(function(question) {
        question.questionSet = questionSetId;
        return question;
    });
    createQuestion(defaultQuestions[0]).then(function() {
        createQuestion(defaultQuestions[1]).then(function() {
            createQuestion(defaultQuestions[2]).then(function() {
                createQuestion(defaultQuestions[3]);
            });
        });
    })
}

function createQuestion(questionObj) {

    return Question.findOne({}, {}, {
        sort: {
            '_id': 'descending'
        }
    }, function(err, question) {
        var latestQuestionId = question ? question._id : 0; // in the db is one based
        var questionId = latestQuestionId + 1;

        questionObj._id = questionId;
        return Question.create(questionObj, function(err, question) {
            if (err) {
                console.log(err);
            }
            QuestionSet.update({
                _id: questionObj.questionSet
            }, {
                $addToSet: {
                    questions: questionObj._id
                }
            }).exec();
        });

    });

}

function createTopic(topicObj) {

    Topic.findOne({}, {}, {
        sort: {
            '_id': 'descending'
        }
    }, function(err, topic) {

        var latestTopicId = topic ? topic._id : 0;
        var topicId = latestTopicId + 1;
        topicObj._id = topicId;

        Topic.create(topicObj, function(err, topic) {
            if (err) {
                console.log(err);
            }

        });
    });
}

function createQuote(quoteObj) {
    return Quote.findOne({}, {}, {
        sort: {
            '_id': 'descending'
        }
    }, function(err, quote) {
        console.log(quote);
        var latestQuoteId = quote ? quote._id : 0;
        var quoteId = latestQuoteId + 1;
        quoteObj._id = quoteId;
        return Quote.create(quoteObj, function(err, quote) {
            if (err) {
                console.log(err);
            }
        })
    });
}
