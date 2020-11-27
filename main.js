$(function () {
    

 $('.feedbox2').hide();
 $('.feedbox3').hide();
 $('.feedbox4').hide();

 $('.active2').css('background','#32DB43')
 $('.activem2').css('background','#32DB43')

 $('.d6').hide();
 $('.d7').hide();
 $('.d8').hide();


 
 $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 150) {
        $('#tit2').css({
            position:'fixed',
            marginTop:'-100px',
            background:'#1F4454',
        })
        $('button').css({
           color:'white'
        })
       $(".fetchbox").css({
           marginTop:'250px'
       })
       $('.bop').css({
           display:'block'
       })
       $('.cur').css({
         color:'white'
      })
    } else {
        $('#tit2').css({
            position:'',
            marginTop:'',
            background:''
        })
        $('button').css({
            color:''
         })
         $(".fetchbox").css({
            marginTop:''
        })
        $('.bop').css({
            display:''
        })
        $('.cur').css({
            color:''
        })
    }
});





 $("#sub").click(function () {

    let a = $("#datepicker1").val()
    let b = $("#datepicker2").val()


    $.ajax({
        url:'route.php?func=filterDate',
        method:'post',
        dataType:'text',
        data:{from:a,to:b},
        beforeSend:function(){

        },
        success:function(res){

            $('.feedbox4').show();
            $('.feedbox').hide();
            $('.feedbox2').hide();
            $('.feedbox3').hide();
            $('.feedbox4').html(res);
            // $('.d5').load('route.php?func=calculateMoneyf');
        }
    })

    $.ajax({
        url:'route.php?func=calculateMoneyf',
        method:'post',
        dataType:'text',
        data:{from:a,to:b},
        beforeSend:function(){

        },
        success:function(res){
            $('.d6').hide();
            $('.d7').hide();
            $('.d5').hide();
            $('.d8').show();
            $('.d8').html(res);
            // $('.d5').load('route.php?func=calculateMoneyf');
        }
    })



 })

        //  when feeds is clicked
        $('.active2').click(function (params) {
            $('.d6').hide();
            $('.d8').hide();
            $('.d7').hide();
            $('.d5').show();
             $('.active2').css('background','#32DB43')
             $('.active3').css('background','none')
             $('.active4').css('background','none')
             $('.active5').css('background','none')
   
             $('.feedbox').show();
             $('.feedbox2').hide();
             $('.feedbox3').hide();
             $('.feedbox4').hide();

        })


        // when yesterday is clicked
        $('.active3').click(function (params) {
            $('.d5').hide();
            $('.d7').hide();
            $('.d6').show();
            $('.d8').hide();

            $('.d6').load('route.php?func=calculateMoneyY');
            $('.feedbox2').load('route.php?func=fetchFeedsY');
            $('.active3').css('background','#32DB43')
            $('.active2').css('background','none')
            $('.active4').css('background','none')
            $('.active5').css('background','none')
   
            $('.feedbox2').show();
            $('.feedbox').hide();
            $('.feedbox3').hide();
            $('.feedbox4').hide();

       })

       // when pastdays is clicked
       $('.active4').click(function (params) {
        $('.d5').hide();
        $('.d7').show();
        $('.d6').hide();
        $('.d8').hide();

        $('.d7').load('route.php?func=calculateMoneyP');
        $('.feedbox3').load('route.php?func=fetchFeedsP');
            $('.active3').css('background','none')
            $('.active2').css('background','none')
            $('.active4').css('background','#32DB43')
            $('.active5').css('background','none')

            
            $('.feedbox3').show();
            $('.feedbox2').hide();
            $('.feedbox').hide();
            $('.feedbox4').hide();

       })



       $('.active5').click(function(){
        $('.active2').css('background','none')
        $('.active3').css('background','none')
        $('.active4').css('background','none')
        $('.active5').css('background','#32DB43')

       })
    
    // listen every half a second to fetch results 
    setInterval(function () {
        $('.feedbox').load('route.php?func=fetchFeeds');
        $('.d5').load('route.php?func=calculateMoney');
    },500)

   
        $('.memoney').load('route.php?func=calculateMerchantMoney');
        $('.countc').load('route.php?func=fetch_collection_activities')
        $('.counta').load('route.php?func=fetch_signup_activities')


   
    
    







        // ============================================   merchant side ========================
        // ============================================   merchant side ========================
        // ============================================   merchant side ============================

        $('.activem5').click(function(){

            $('.activem2').css('background','none')
            $('.activem3').css('background','none')
            $('.activem4').css('background','none')
            $('.activem5').css('background','#32DB43')

        })
        
        $('#sub2').click(function(){

         
            let a = $('#datepickerm1').val()
            let b = $('#datepickerm2').val()


            $.ajax({
                url:'route.php?func=filterMerchant',
                method:'post',
                dataType:'text',
                data:{from:a,to:b},
                beforeSend:function(){
        
                },
                success:function(res){
        
                    initMap();
                    
                }
            })


            $.ajax({
                url:'route.php?func=calculateMerchantMoney',
                method:'post',
                dataType:'text',
                data:{data:'yesterday'},
                beforeSend:function(){
        
                },
                success:function(res){
        
                   $('.memoney').html(res)
                   $('.countc').load('route.php?func=fetch_collection_activities')
                   $('.counta').load('route.php?func=fetch_signup_activities')
                   
                }
            })

        })


        $('.activem3').click(function (params) {
          
             $('.activem2').css('background','none')
             $('.activem3').css('background','#32DB43')
             $('.activem4').css('background','none')
             $('.activem5').css('background','none')

             $.ajax({
                url:'route.php?func=change_state',
                method:'post',
                dataType:'text',
                data:{data:'yesterday'},
                beforeSend:function(){
        
                },
                success:function(res){
        
                    initMap();
                  
                   
                }
            })
            $.ajax({
                url:'route.php?func=calculateMerchantMoney',
                method:'post',
                dataType:'text',
                data:{data:'yesterday'},
                beforeSend:function(){
        
                },
                success:function(res){
        
                   $('.memoney').html(res)
                   $('.countc').load('route.php?func=fetch_collection_activities')
                   $('.counta').load('route.php?func=fetch_signup_activities')

                   
                }
            })


   
        })



        
        $('.activem2').click(function (params) {
          
            $('.activem2').css('background','#32DB43')
            $('.activem3').css('background','none')
            $('.activem4').css('background','none')
            $('.activem5').css('background','none')

            $.ajax({
               url:'route.php?func=change_state',
               method:'post',
               dataType:'text',
               data:{data:'today'},
               beforeSend:function(){
       
               },
               success:function(res){
       
                   initMap();
                  
               }
           })
           $.ajax({
               url:'route.php?func=calculateMerchantMoney',
               method:'post',
               dataType:'text',
               data:{data:'today'},
               beforeSend:function(){
       
               },
               success:function(res){
       
                  $('.memoney').html(res)
                  $('.countc').load('route.php?func=fetch_collection_activities')
                  $('.counta').load('route.php?func=fetch_signup_activities')
               }
           })


  
       })
   


       $('.activem4').click(function (params) {
          
        $('.activem2').css('background','none')
        $('.activem3').css('background','none')
        $('.activem4').css('background','#32DB43')
        $('.activem5').css('background','none')

        $.ajax({
           url:'route.php?func=change_state',
           method:'post',
           dataType:'text',
           data:{data:'past days'},
           beforeSend:function(){
   
           },
           success:function(res){
   
               initMap();
              
           }
       })
       $.ajax({
           url:'route.php?func=calculateMerchantMoney',
           method:'post',
           dataType:'text',
           data:{data:'past days'},
           beforeSend:function(){
   
           },
           success:function(res){
   
              $('.memoney').html(res)
              $('.countc').load('route.php?func=fetch_collection_activities')
              $('.counta').load('route.php?func=fetch_signup_activities')

              
           }
       })



   })

    



})