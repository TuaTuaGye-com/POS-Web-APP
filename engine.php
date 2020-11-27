<?php 



function CustomerInfo($id,$query)
{
    include 'db.php';
    
    $fetch = mysqli_query($con,"SELECT * FROM customers WHERE id = '$id' ");


    $row = mysqli_fetch_array($fetch);

    return $row[$query];

    

}

function showInf()
{
    include 'db.php';


    $spot_id = $_POST['dataid'];
    $mid = $_POST['merchantid'];

    

    $fetch = mysqli_query($con,"SELECT * FROM activities WHERE id = '$spot_id' ");

    $fe    = mysqli_query($con,"SELECT SUM(moneyTaken) as money FROM activities WHERE mercahntsId = '$mid' ");

    $total   =  mysqli_fetch_array($fe);
    
    while ($row = mysqli_fetch_array($fetch)) {

        $balance = CustomerInfo($row['customerId'],'price-product')  - $total['money'];
        
        echo '<div class="inf">
                  <h1 class="cname">'.$row['role'].'</h1>
                  <div class="cname"><span id="bbb">Customer </span>: <span id="bb">'.CustomerInfo($row['customerId'],'fname').'</span> </div>
                  <div class="cname"><span id="bbb">Product</span>  : <span id="bb">'.CustomerInfo($row['customerId'],'product').'</span> </div>
                  <div class="cname"><span id="bbb">Product Price </span>:<span id="bb">Ghc '.CustomerInfo($row['customerId'],'price-product').'</span> </div>
                  <div class="cname"><span id="bbb">Amount Paid </span>:<span id="bb">Ghc '.$row['moneyTaken'].'</span> </div>
                  <div class="cname"><span id="bbb">Balance </span>:<span id="bb">GHc '.$balance.'</span></div>
              </div>';

    }
    


}


function fetch_collection_activities()
{
    include 'db.php';

    $mid = $_SESSION["MID"];

    $query = $_SESSION["query"];

    $fetch = mysqli_query($con, $query."AND mercahntsId = '$mid' AND role = 'collection' ");


    $count  = mysqli_num_rows($fetch);

    echo $count;

}

function fetch_signup_activities()
{
    include 'db.php';

    $mid = $_SESSION["MID"];

    $query = $_SESSION["query"];

    $fetch = mysqli_query($con, $query."AND mercahntsId = '$mid' AND role = 'signup' ");


    $count  = mysqli_num_rows($fetch);
    
    echo $count;

}




function filterMerchant(){

    include 'db.php';

    $from = $_POST['from'];
    $to   = $_POST['to'];
    $mid = $mid = $_SESSION["MID"];


    $_SESSION["query"] = "SELECT * FROM activities WHERE DATE(time) BETWEEN '$from' AND '$to' ";
    $_SESSION["querym"] = "SELECT SUM(moneyTaken) as money FROM activities WHERE DATE(time) BETWEEN '$from' AND '$to' ";
}

function change_state(){

    $condition = $_POST['data'];

    if ($condition == 'today') {
        
        $_SESSION["query"] = "SELECT * FROM activities WHERE DATE(time) = CURDATE()";
        $_SESSION["querym"] = "SELECT SUM(moneyTaken) as money FROM activities WHERE DATE(time) = CURDATE()";

    }
    if ($condition == 'yesterday') {
        
        $_SESSION["query"] = "SELECT * FROM activities WHERE DATE(time) = CURDATE() - 1 ";
        $_SESSION["querym"] = "SELECT SUM(moneyTaken) as money FROM activities WHERE DATE(time) = CURDATE() - 1";

    }
    if ($condition == 'past days') {
        
        $_SESSION["query"] = "SELECT * FROM activities WHERE MONTH(time) = MONTH(NOW()) AND YEAR(time) = YEAR(NOW())";
        $_SESSION["querym"] = "SELECT SUM(moneyTaken) as money FROM activities 
          WHERE MONTH(time) = MONTH(NOW()) AND YEAR(time) = YEAR(NOW())";
    }


    // return $_SESSION["query"];

}


function fetchMerchant_on_map()
{
    include 'db.php';

    $mid = $_SESSION["MID"];

    $query = $_SESSION["query"];

    $fetch = mysqli_query($con, $query."AND mercahntsId = '$mid' ");

    $spots = [];

    while ($row = mysqli_fetch_array($fetch)) {


        $spots[] = $row;

    }


    echo json_encode($spots);

}



function calculateMerchantMoney()
{
    include 'db.php';

    $mid = $_SESSION["MID"];
    $query = $_SESSION["querym"];

    $fetch = mysqli_query($con,$query." AND mercahntsId = '$mid' ");

    $row = mysqli_fetch_array($fetch);

    echo '<span class="cur">Ghc</span> '.$row['money'].'.00';


}



function calculateMoneyf()
{
    include 'db.php';

    $from = $_POST['from'];
    $to   = $_POST['to'];


    $fetch = mysqli_query($con,"SELECT SUM(moneyTaken) as money FROM activities WHERE DATE(time) BETWEEN '$from' AND '$to' ");

    $row = mysqli_fetch_array($fetch);

    echo '<span class="cur">Ghc</span> '.$row['money'].'.00';


}

function filterDate(){

    include 'db.php';

    $from = $_POST['from'];
    $to   = $_POST['to'];


    $fetch = mysqli_query($con,"SELECT * FROM activities WHERE DATE(time) BETWEEN '$from' AND '$to' ");
   
    while ($row = mysqli_fetch_array($fetch)) {
        
        echo '
        <a href="merchant_info.php?mid='.$row['mercahntsId'].'">
        <div id="id:'.$row['id'].'" class="feeds-res">
           <img id="fimg" src="profiles/'.fetchMerchantDetails($row['mercahntsId'],'MerchantPhoto').'"/>
           <div id="bos" class="name">'.fetchMerchantDetails($row['mercahntsId'],'fname').' '.fetchMerchantDetails($row['mercahntsId'],'lname').'</div>
           <div id="box"  class="role">'.$row['role'].'</div>
           <div id="bo" class="role">Ghc '.$row['moneyTaken'].'</div>
        </div>
        </a>
       ';

    }
}


function calculateMoney()
{
    include 'db.php';

    $fetch = mysqli_query($con,"SELECT SUM(moneyTaken) as money FROM activities WHERE DATE(time) = CURDATE()");

    $row = mysqli_fetch_array($fetch);

    echo '<span class="cur">Ghc</span> '.$row['money'].'.00';


}

function calculateMoneyY()
{
    include 'db.php';

    $fetch = mysqli_query($con,"SELECT SUM(moneyTaken) as money FROM activities WHERE DATE(time) = CURDATE()-1");

    $row = mysqli_fetch_array($fetch);

    echo '<span class="cur">Ghc</span> '.$row['money'].'.00';


}


function calculateMoneyP()
{
    include 'db.php';

    $fetch = mysqli_query($con,"SELECT SUM(moneyTaken) as money FROM activities 
    WHERE MONTH(time) = MONTH(NOW()) AND YEAR(time) = YEAR(NOW())");

    $row = mysqli_fetch_array($fetch);

    echo '<span class="cur">Ghc</span> '.$row['money'].'.00';


}

function fetchMerchantDetails($id,$request){

    include 'db.php';

    $fetch = mysqli_query($con,"SELECT * FROM merchants WHERE id = '$id' ");

    $row = mysqli_fetch_array($fetch);

    return $row[$request];

}



function fetchFeeds(){

    include 'db.php';

    $fetch = mysqli_query($con,"SELECT *  FROM activities WHERE DATE(time) = CURDATE()");


    while ($row = mysqli_fetch_array($fetch)) {
        
        echo '
        <a href="merchant_info.php?mid='.$row['mercahntsId'].'">
        <div id="id:'.$row['id'].'" class="feeds-res">
           <img id="fimg" src="profiles/'.fetchMerchantDetails($row['mercahntsId'],'MerchantPhoto').'"/>
           <div id="bos" class="name">'.fetchMerchantDetails($row['mercahntsId'],'fname').' '.fetchMerchantDetails($row['mercahntsId'],'lname').'
           <div class="time"> 2:39 </div>
           </div>
           
           <div id="box"  class="role">'.$row['role'].'</div>
           <div id="bo" class="role">Ghc '.$row['moneyTaken'].'</div>
        </div>
        </a>
  
       ';

    }

  

}


function fetchFeedsY()
{
    include 'db.php';

    $fetch = mysqli_query($con,"SELECT *  FROM activities WHERE DATE(time) = CURDATE()-1");


    while ($row = mysqli_fetch_array($fetch)) {
        
        echo '
        <a href="merchant_info.php?mid='.$row['mercahntsId'].'">
        <div id="id:'.$row['id'].'" class="feeds-res">
           <img id="fimg" src="profiles/'.fetchMerchantDetails($row['mercahntsId'],'MerchantPhoto').'"/>
           <div id="bos" class="name">'.fetchMerchantDetails($row['mercahntsId'],'fname').' '.fetchMerchantDetails($row['mercahntsId'],'lname').'</div>
           <div id="box"  class="role">'.$row['role'].'</div>
           <div id="bo" class="role">Ghc '.$row['moneyTaken'].'</div>
        </div>
        </a>
  
       ';

    }
}

function fetchFeedsP()
{
    include 'db.php';

    
    $fetch = mysqli_query($con,"SELECT * FROM activities
    WHERE MONTH(time) = MONTH(NOW()) AND YEAR(time) = YEAR(NOW())");


    while ($row = mysqli_fetch_array($fetch)) {
        
        echo '
        <a href="merchant_info.php?mid='.$row['mercahntsId'].'">
        <div id="id:'.$row['id'].'" class="feeds-res">
           <img id="fimg" src="profiles/'.fetchMerchantDetails($row['mercahntsId'],'MerchantPhoto').'"/>
           <div id="bos" class="name">'.fetchMerchantDetails($row['mercahntsId'],'fname').' '.fetchMerchantDetails($row['mercahntsId'],'lname').'</div>
           <div id="box"  class="role">'.$row['role'].'</div>
           <div id="bo" class="role">Ghc '.$row['moneyTaken'].'</div>
        </div>
        </a>
  
       ';

    }
}