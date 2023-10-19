// IOT questions familarization
var iot_true_neg = {
    timeline: [
        {
            type: jsPsychVideoKeyboardResponse,
            stimulus: jsPsych.timelineVariable('video'),
            choices: "ALL_KEYS",
            trial_ends_after_video: false

        },
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: jsPsych.timelineVariable('question'),
            choices: ['Ja', 'Nein'],
            response_ends_trial: true,
            data: {iot: jsPsych.timelineVariable('iot'), correct: jsPsych.timelineVariable('correct')},
            on_finish: function(data){
                        if(data.response == jsPsych.timelineVariable('correct')){
                            data.correct_response = true;
                        } else if(data.response != jsPsych.timelineVariable('correct')) {
                            data.correct_response = false;
                        }
                    } 
        },
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: '',
            choices: ['Weiter'],
            response_ends_trial: true
        }
    ],
    timeline_variables: [
        {video: ['videos/control_questions/IOT_TRUE_neg_1_Fahrrad.mp4'],iot: 'TRUE_neg1',correct:'0', question: 'XXX'},
        {video: ['videos/control_questions/IOT_TRUE_neg_2_Bild.mp4'],iot: 'TRUE_neg2',correct:'0', question: 'XXX'},
    ], 
    sample: {
        type: 'without-replacement',
        size: 1
            }
};

var iot_true_neg2_error = {
    timeline: [
        {
            type: jsPsychVideoKeyboardResponse,
            stimulus: ['videos/control_questions/IOT_TRUE_neg_1_Fahrrad.mp4'],
            choices: "ALL_KEYS",
            trial_ends_after_video: false

        },
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: 'Wrong, try again',
            choices: ['Ja', 'Nein'],
            response_ends_trial: true,
            data: {iot: 'TRUE_neg1'},
            on_finish: function(data){
                        if(data.response == '0'){
                            data.correct_response = true;
                        } else if(data.response != '0') {
                            data.correct_response = false;
                        }
                    } 
        },
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: '',
            choices: ['Weiter'],
            response_ends_trial: true
        }
    ],
    conditional_function: function(){
        var iot_last = jsPsych.data.get().last(1).values()[0].iot;
        if(data.iot_last == 'TRUE_neg2'){
            return true;
        } else {
            return false;
        }
    }
};

var iot_true_neg1_error = {
    timeline: [
        {
            type: jsPsychVideoKeyboardResponse,
            stimulus: ['videos/control_questions/IOT_TRUE_neg_2_Bild.mp4'],
            choices: "ALL_KEYS",
            trial_ends_after_video: false

        },
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: 'Wrong, try again',
            choices: ['Ja', 'Nein'],
            response_ends_trial: true,
            data: {iot: 'TRUE_neg1'},
            on_finish: function(data){
                        if(data.response == '0'){
                            data.correct_response = true;
                        } else if(data.response != '0') {
                            data.correct_response = false;
                        }
                    } 
        },
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: '',
            choices: ['Weiter'],
            response_ends_trial: true
        }
    ],
    conditional_function: function(){
        var iot_last = jsPsych.data.get().last(1).values()[0].iot;
        if(iot_last == 'TRUE_neg1'){
            return true;
        } else {
            return false;
        }
    }
}

var iot_true_neg_error = {
    timeline: [iot_true_neg1_error, iot_true_neg2_error],
    conditional_function: function(){
        var last_resp = jsPsych.data.get().last(1).values()[0].correct_response;
        console.log("last response: " + last_resp)
        if(last_resp == true){
            return false;
        } else {
            return true;
        }
    }
    
}

var iot_true_neg_timeline = [iot_true_neg, iot_true_neg_error]

//{video: 'videos/control_questions/IOT_TRUE_pos_1_Ball.mp4',iot: 'TRUE_pos',correct:'0', question: 'XXX'},
//        {video: 'videos/control_questions/IOT_TRUE_pos_2_Supermarkt.mp4',iot: 'TRUE_pos',correct:'0', question: 'XXX'},
