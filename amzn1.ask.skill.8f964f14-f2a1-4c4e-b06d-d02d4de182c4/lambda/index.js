/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const express = require('express');
const { ExpressAdapter } = require('ask-sdk-express-adapter');

const app = express();
const port = 3037;

app.use(express.statis(__dirname + '/public'));



const ACTIONS = [
    'rock',
    'paper',
    'scissor'
];
const SCORE = 0;

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to rock paper scissor online, what would you like to do? If you would like to play a game, tell me your first move, Rock, Paper, or Scissor. If you would like to know your current score, ask to see current score. If you would like information about this skill, ask for information';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const GameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GameIntent';
    },
    handle(handlerInput) {
        const userAction = handlerInput.requestEnvelope.request.intent.slots.action.value;

        let speakOutput = '';
        let repromptOutput = ' What is your move?'

        const alexaAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

        const combo = userAction + alexaAction;

        switch (combo) {
            case 'rockrock':
                speakOutput += "you played rock and i played rock, its a tie!";
                break;
            case 'rockpaper':
                speakOutput += "you played rock and i played paper, i win!";
                SCORE + 1;
                break;
            case 'rockscissor':
                speakOutput += "you played rock and i played scissor, you win! congrats!";
                break;
            case 'paperrock':
                speakOutput += "you played paper and i played rock, you win! congrats!";
                SCORE + 1;
                break;
            case 'paperpaper':
                speakOutput += "you played paper and i played paper, its a tie!";
                break;
            case 'paperscissor':
                speakOutput += "you played paper and i played scissor, i win!";
                break;
            case 'scissorsrock':
                speakOutput += "you played scissor and i palyed rock, i win!";
                break;
            case 'scissorpaper':
                speakOutput += "you played scissor and i played paper, you win! congrats!";
                SCORE + 1;
                break;
            case 'scissorscissor':
                speakOutput += "you played scissor and i played scissor, its a tie!";
                break;
            default:
                break;
        }

        return handlerInput.responseBuilder
            .speak(speakOutput + repromptOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};

const ScoreIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScoreIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Your have ' + SCORE + ' wins!';
        let repromptOutput = ' Would you like me to repeat?'

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(repromptOutput)
            .getResponse();
    }
};

const InfoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'InfoIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'This is a simple Rock, Paper, Scissors Alexa Skill created for GIMM 340 by Geoffrey Park.';
        let repromptOutput = ' Would you like me to repeat?'

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(repromptOutput)
            .getResponse();
    }
};

const YippeeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'YippeeIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Yippeeeeeeeee!';
        let repromptOutput = ' Would you like me to repeat?'

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(repromptOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'This is a skill to play rock paper scissors! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Thank you for playing, goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
const skill = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GameIntentHandler,
        ScoreIntentHandler,
        InfoIntentHandler,
        YippeeIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .create();
const adapter = new ExpressAdapter(skill, false, false);
const app = express();


app.post('/', adapter.getRequestHandlers());
app.listen(3037);

exports.app = app;