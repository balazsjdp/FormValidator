/**
 * Author:    Balázs Horváth
 * Created:   2019.04.02
 **/

function validate({
    inputFormSelector,
    submitButtonSelector,
    validBorderColor,
    invalidBorderColor
}) {
    //  Setting initial variables
    const bordervalid = validBorderColor || 'green'
    const borderinvalid = invalidBorderColor || 'red'
    const submitbutton = submitButtonSelector
    const form = $(inputFormSelector)
    const fields = $(form).find('[data-validate=validate]')

    // Initiating basic modifications

    $(submitbutton).attr('disabled', 'true')

    // Begin main loop
    for (let i = 0; i < fields.length; i++) {
        if ($(fields[i]).val() == '' || $(fields[i]).val() == null) {
            $(fields[i]).attr('data-valid', 'false')
        } else {
            $(fields[i]).css('border-color', bordervalid).css('border-right', '5px solid' + ' ' + bordervalid).attr('data-valid', 'true')
        }
        // Keyup event. This is triggered on every keystroke
        $(fields[i]).on('keyup', function () {
            let minValue = $(this).attr('data-min-value')
            if (minValue > $(this).val().length || $(this).val() == '' || $(this).val() == null) {
                $(this).css('border-color', borderinvalid).css('border-right', '5px solid' + ' ' + borderinvalid).attr('data-valid', 'false')
            } else {
                $(this).css('border-color', bordervalid).css('border-right', '5px solid' + ' ' + bordervalid).attr('data-valid', 'true')
            }
            validateForm(submitbutton)
        });
        // Change event. This is triggered upon changing form elements like :input or :select etc..
        $(fields[i]).on('change', function () {
            let minValue = $(this).attr('data-min-value')
            if ($(this).val() && (minValue > $(this).val().length || $(this).val() == '' || $(this).val() == null)) {
                $(this).css('border-color', borderinvalid).css('border-right', '5px solid' + ' ' + borderinvalid + '').attr('data-valid', 'false')
            } else {
                $(this).css('border-color', bordervalid).css('border-right', '5px solid' + ' ' + bordervalid + '').attr('data-valid', 'true')
            }
            validateForm(submitbutton)
        });
    }
    // End main loop 

    // Validating function looks for elements with 'data-valid=false' attributes. If finds one the form is invalid. This function is called on every 'change' and 'keyup' event
    function validateForm(submitButtonSelector) {
        let validForm = $(form).find('[data-valid=false]')
        let submitbutton = $(submitButtonSelector)
        if (validForm.length > 0) {
            $(submitbutton).attr('disabled', true)
        } else {
            $(submitbutton).attr('disabled', false)
        }
    }

}