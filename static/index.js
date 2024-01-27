/** JavaScript file */
function start_func(){
    /** Function for start */

    document.querySelector('#start').style.display = 'none';
    document.querySelector('#cgpa_or_gpa_div').style.display = 'flex';
}


function cal_illustration(){
    /** 
     * Function that show illutration of calculating student grade.
    */

    document.querySelector('.dew').style.display = 'flex';
    document.querySelector('.container').style.position = 'fixed';
}


function disappear_illustration(){
    /** 
     * Function that will disappear the illutration of calculating student grade.
    */

    document.querySelector('.dew').style.display = 'none';
    document.querySelector('.container').style.position = 'relative';
}


function gpa_or_cgpa(what){
    /** What to calculate */

    if (what == 'GPA'){
        document.querySelector('.GPA_CGPA').value = 'GPA';

        // disappearing some inputs
        document.querySelector('.curr_cgpa').style.display = 'none';
        document.querySelector('.curr_credits').style.display = 'none';
    }
    else if (what == 'CGPA'){
        document.querySelector('.GPA_CGPA').value = 'CGPA';

        // displaying some inputs
        document.querySelector('.curr_cgpa').style.display = 'block';
        document.querySelector('.curr_credits').style.display = 'block';
    };

    document.querySelector('#cgpa_or_gpa_div').style.display = 'none';

    document.querySelector('#grade_point_div').style.display = 'flex';

    // capturing calculation type value
    val = document.querySelector('.GPA_CGPA').value;

    // appending what type of calculation is performing (GPA or CGPA)
    document.querySelectorAll('.calc_cat').forEach( e => {
        // storing calculation type value
        e.innerText = val;
    });
}


function grade_point(point){
    /** What is your school grade point */

    // detecting grading point of the institute
    if (point == '5' || point == 5){
        document.querySelector('.grade_points').value = '5';
    }
    else if (point == '4' || point == 4){
        document.querySelector('.grade_points').value = '4';
    };

    // next form
    document.querySelector('#grade_point_div').style.display = 'none';
    document.querySelector('#get_no_courses').style.display = 'flex';
}


function course_range(){
    /** Create the number of student courses for selection. */

    var arrayDiv1 = new Array();
    num = document.querySelector('.num_courses').value;

    is_cgpa = document.querySelector('.GPA_CGPA').value;

    // our list for unwanted stuffs
    d_store = [];

    // if what to calculate is CGPA
    if (is_cgpa == 'CGPA'){

        fields_req = document.querySelectorAll('.num_courses, .curr_cgpa, .curr_credits');

        // checking if all fields are not empty
        fields_req.forEach(e => {
            if (e.value == '' || e.value == null || e.value == false || Number(e.value) < 1){
                e.style.border = 'solid red 3px';
                d_store.push(false);
            }
            else{
                e.style.border = 'none';
                e.style.borderTop = 'solid lightgrey 3px';
                e.style.borderBottom = 'solid lightgrey 3px';
            };
        });
    };
    
    if (d_store.includes(false)){
        // pass
    }else{
        if (num != '' && num != null && num != false && Number(num) > 0){

            // looping to create the specified number of courses inputs field
            for (var i=0; i < num; i++){
                arrayDiv1[i] = document.createElement('div');
                arrayDiv1[i].className = 'course';
                
                // creating courses input tags (course code, credit unit, grade)
                arrayDiv1[i].innerHTML = '<input type="text" class="code" placeholder="Course code e.g GST 101"> <select name="" class="cu"> <option value="" selected>Select CU</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select> <select name="" class="gd"> <option value="" selected>Select grade</option> <option value="5">A</option> <option value="4">B</option> <option value="3">C</option> <option value="2">D</option> <option value="1">E</option> <option value="0">F</option> </select>';

                // parent div for the above elements
                new_selection_div = document.querySelector('#co');
                new_selection_div.appendChild(arrayDiv1[i]);
            };

            // next form
            document.querySelector('#get_no_courses').style.display = 'none';
            document.querySelector('#calc_div').style.display = 'flex';
        }
        else{
            document.querySelector('.num_courses').style.border = 'solid red 3px';
        };
    };
}


function calc(){
    /** Calculations */

    // our storage list of unwanted stuffs
    d_store = [];

    // grade points container
    grade_points = [];

    // credit unit container
    total_credit_units = [];

    // querying all courses with their respective input fields
    cor = document.querySelectorAll('.course');

    // enumerating each query
    cor.forEach(e => {

        // course code
        aa = e.children[0].value;

        // course credit unit
        a = e.children[1].value;

        // course grade
        b = e.children[2].value;

        // validate course code
        if (aa == '' || aa == null || aa == false){
            e.children[0].style.border = 'solid red 3px';
            d_store.push(false);
        }
        else{
            e.children[0].style.border = 'none';
            e.children[0].style.background = 'lightgrey';
        };

        // validate course credit unit
        if (a == '' || a == null || a == false){
            e.children[1].style.border = 'solid red 3px';
            d_store.push(false);
        }
        else{
            e.children[1].style.border = 'none';
            e.children[1].style.background = 'lightgrey';
        };

        // validate course grade, by making comparising with `===` for the `false` since it will compare externally, but if to use `==` it will compare internally. Note `false==0 = true`, `false===0 = false`.
        if (b == '' || b == null || b === false){
            e.children[2].style.border = 'solid red 3px';
            d_store.push(false);
        }
        else{
            e.children[2].style.border = 'none';
            e.children[2].style.background = 'lightgrey';
        };

        // converting to number
        a = Number(a);

        // calculating a single course grade points
        z = a * b;

        // appending
        grade_points.push(z);
        total_credit_units.push(a);
    });

    // checking if `d_store` list contains any unwanted stuffs
    if (d_store.includes('') || d_store.includes(null) || d_store.includes(false)){
        // pass
    }
    else{
        is_cgpa = document.querySelector('.GPA_CGPA').value;

        if (is_cgpa == 'GPA'){
            // making the following to be zero since, GPA calculation don't require previous stuffs
            curr_gptd = 0;
            curr_untd = 0;
        }
        else if (is_cgpa == 'CGPA'){
            // getting previous stuffs (CGPA and registered credit unit), also converting them to numbers
            curr_gptd = Number(document.querySelector('.curr_cgpa').value);
            curr_untd = Number(document.querySelector('.curr_credits').value);

            // calculating student total grade points (previous)
            curr_gptd = curr_gptd * curr_untd;
        };

        // real values
        weighted_grade_point = curr_gptd;
        registered_credit_units = curr_untd;

        // summing up grade points and credit units
        for (i = 0; i < grade_points.length; i++){
            // incrementing grade points
            weighted_grade_point += grade_points[i];

            // incrementing credit units
            registered_credit_units += total_credit_units[i];
        };

        // taking average
        result_value = weighted_grade_point / registered_credit_units;
        
        // round to decimal place
        result_value = result_value.toFixed(2);

        // grabbing value of grade points
        grade_point_of_uni = document.querySelector('.grade_points').value;

        // for 5 points grading system
        if (grade_point_of_uni == '5' || grade_point_of_uni == 5){
            if (result_value >= 4.5 && result_value <= 5){
                certificate = 'First Class';
            }
            else if (result_value >= 3.5 && result_value <= 4.49){
                certificate = 'Second Class Honours';
            }
            else if (result_value >= 2.4 && result_value <= 3.49){
                certificate = 'Second Class Lower';
            }
            else if (result_value >= 1.5 && result_value <= 2.39){
                certificate = 'Third Class';
            }
            else if (result_value >= 1.0 && result_value <= 1.49){
                certificate = 'Pass';
            }
            else if (result_value >= 0 && result_value <= 0.99){
                certificate = 'Failed';
            }
            else{
                certificate = `Un-believable ${is_cgpa} result: ${result_value}`;
            };
        }
        // for 4 points grading system
        else if (grade_point_of_uni == '4' || grade_point_of_uni == 4){
            if (result_value >= 3.5 && result_value <= 4.0){
                certificate = 'First Class';
            }
            else if (result_value >= 3.0 && result_value <= 3.49){
                certificate = 'Second Class Honours';
            }
            else if (result_value >= 2.0 && result_value <= 2.99){
                certificate = 'Second Class Lower';
            }
            else if (result_value >= 1.0 && result_value <= 1.99){
                certificate = 'Third Class';
            }
            // else if (result_value >= 0.5 && result_value <= 0.99){
            //     certificate = 'Pass';
            // }
            else if (result_value >= 0 && result_value <= 0.99){
                certificate = 'Failed';
            }
            else{
                certificate = `Un-believable ${is_cgpa} result: ${result_value}`;
            };
        };

        // disapperaing calculation div
        document.querySelector('#calc_div').style.display = 'none';

        // result values
        document.querySelector('#registered_credit_units').textContent = registered_credit_units;

        // rounding to whole number
        weighted_grade_point = weighted_grade_point.toFixed(0);
        
        // assigng values to result page
        document.querySelector('#weighted_grade_point').textContent = weighted_grade_point;
        document.querySelector('#result_value').textContent = result_value;
        document.querySelector('#certificate').textContent = certificate;

        // displaying result form
        document.querySelector('#result_div').style.display = 'flex';

        // calculation illustration
        cal_illustration();

        // removing calculation illustration
        setTimeout(disappear_illustration, 1000);
    };
}


function restart(){
    /** Function that help to restart fresh calculation */
    
    // all inputed tags
    fields = document.querySelectorAll('.num_courses, .curr_cgpa, .curr_credits');

    // making all the above input fields to be empty
    fields.forEach( e => {
        e.value = '';
        e.style.border = 'none';
        e.style.borderTop = 'solid lightgrey 3px';
        e.style.borderBottom = 'solid lightgrey 3px';
    });

    // catching all previous courses div (if previously try to do, but suddenly press reset button), so it will remove them, if not in the next calculation it will include the previous data in account
    rem_coses = document.querySelectorAll('.course');

    // removing all previous courses datas (code, credit unit, and grade) fields
    rem_coses.forEach( e => {
        e.remove();
    });

    // displaying start div
    document.querySelector('#start').style.display = 'flex';

    // the following make all of them to not display at the moment of restart
    document.querySelector('#data_store').style.display = 'none';
    document.querySelector('#cgpa_or_gpa_div').style.display = 'none';
    document.querySelector('#grade_point_div').style.display = 'none';
    document.querySelector('#get_no_courses').style.display = 'none';
    document.querySelector('#calc_div').style.display = 'none';
    document.querySelector('#result_div').style.display = 'none';
}


function guide(){
    /** Show guide spans */

    document.querySelector('.main').style.display = 'none';
    document.querySelector('.guide').style.display = 'block';

    // getting all head anchor tag, and remove them using the for-each loop below
    a = document.querySelectorAll('.container .header div a');
    
    a.forEach( e => {
        e.remove();
    });

    // creating new anchor tag elements after being removing all above
    x = document.createElement('a');
    y = document.createElement('a');
    z = document.createElement('a');

    x.innerHTML = '<a  onclick="main()" class="h_link_sm">Main</a>';
    y.innerHTML = '<a  onclick="main()" class="h_link">Main</a>';
    z.innerHTML = '<a href="https://usmanmusa1920.github.io" class="h_link">Developer</a>';
    
    // div to append them (anchor tags)
    b = document.querySelector('.container .header div');

    b.appendChild(x);
    b.appendChild(y);
    b.appendChild(z);

    document.querySelector('.f_guide').style.display = 'none';
    document.querySelector('.f_main').style.display = 'inline';
}


function main(){
    /** Show main spans */
    
    document.querySelector('.main').style.display = 'block';
    document.querySelector('.guide').style.display = 'none';

    // getting all head anchor tag, and remove them using the for-each loop below
    a = document.querySelectorAll('.container .header div a');

    a.forEach( e => {
        e.remove();
    });

    // creating new anchor tag elements after being removing all above
    x = document.createElement('a');
    y = document.createElement('a');
    z = document.createElement('a');

    x.innerHTML = '<a  onclick="guide()" class="h_link_sm">Guide</a>';
    y.innerHTML = '<a  onclick="guide()" class="h_link">Guide</a>';
    z.innerHTML = '<a href="https://usmanmusa1920.github.io" class="h_link">Developer</a>';
    
    // div to append them (anchor tags)
    b = document.querySelector('.container .header div');
    
    b.appendChild(x);
    b.appendChild(y);
    b.appendChild(z);

    document.querySelector('.f_guide').style.display = 'inline';
    document.querySelector('.f_main').style.display = 'none';
}


function this_year(){
    /** This function retrieve current year we are. */

    var this_year = new Date();
    document.getElementById("this_year").innerHTML = this_year.getFullYear();
}
