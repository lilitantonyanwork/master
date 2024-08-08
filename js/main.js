$(function (){
    const input = document.querySelector("#phone");
    const iti = window.intlTelInput(input, {
        initialCountry: "RU",
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.8.0/build/js/utils.js",
    });
    const input_modal = document.querySelector("#popup-phone");
    const iti_modal = window.intlTelInput(input_modal, {
        initialCountry: "RU",
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.8.0/build/js/utils.js",
    });



    $('.form-submit').on('click',function (e){
        e.preventDefault();
        let tel = iti.getNumber();
        console.log( iti.getNumber())
        let otpravka = true;
        if(tel ==""){
            otpravka = false;
        }
        let dannie = {'polz_tel':tel};
        if(otpravka){
                $.post('phone.php', dannie, function(otvet){
                    console.log(otvet)
                    if(otvet.status){
                        $('.tel-popup').modal('hide');
                        $('#statusModal .modal-body').text(otvet.text)
                        $('#statusModal').modal('show');
                    } else{
                        $('.alert').text(otvet.text)
                        $('.alert').toggle();
                        setTimeout(function (){
                            $('.alert').toggle('');

                        }, 3000)

                    }

                }, 'json');
            }
    })
    $('.modal-submit').on('click',function (e){
        e.preventDefault();
        let tel = iti_modal.getNumber();
        let otpravka = true;
        if(tel ==""){
            otpravka = false;
        }
        let dannie = {'polz_tel':tel};
        if(otpravka){
            $.post('phone.php', dannie, function(otvet){
                if(otvet.status){
                    $('.modal-status-text').text(otvet.text)
                    $('.modal-status-text').show();
                    $('.tel-popup form').css({'display':'none '});
                    $('.modal-submit').hide()
                } else{
                    $('.alert').text(otvet.text)
                   $('.alert').toggle();
                    setTimeout(function (){
                        $('.alert').toggle('');

                    }, 3000)

                }

            }, 'json');
        }
    })
    $('.tel-popup').on('hidden.bs.modal', function (e) {
        $('#popup-phone').val('')
        $('.modal-submit').show();
        $('.modal-status-text').hide();
        $('.tel-popup form').css({'display':'flex '});
    })
})
