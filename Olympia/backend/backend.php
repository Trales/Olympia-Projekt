<?php

/*$method = "login";
$username = "username";
$password = "Maxwell Frederick";
$medal = "Gold";
$score = "90";*/
switch ($method)
{
  case "setResult": 
    $result = updateResult($parameter->athletName, $parameter->medal, $parameter->score, $parameter->sportType);
    echo $result;
    break;
  case "login":
    $result = login($parameter->username, $parameter->password);
    echo $result;
    break;

  case "register":
    $result = register($parameter->username, $parameter->password);
    echo $result;
    break;

  case "getScore":
    $result = getLandResult();
    echo $result;
    break;

  case "getScoreByCountry":
    $result = getLandResultFromAthlete($parameter->country);
    echo $result;
    break;
  
  case "getScoreBySportType": 
    $result = getSportResultFromAthlete($parameter->sportType);
    echo $result;
    break;
}

//establish a connection with the mysql database
function getConnection()
{
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "olympia";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  return $conn;
}

//add an user to the 'login'-datatable
function register($username, $password)
{
  //username überprüfen ob eindeutig
    $encrypted = md5($password);
    $conn = getConnection();
    $sql = "SELECT login.password FROM login WHERE login.user = '". $username ."' AND password = '" . $encrypted . "'";
    $result = $conn->query($sql);
    if($result->fetch_assoc()) 
    { 
      $res = '
      {
        "result": false
      }';
      $conn->close();
    }
    else
    {
      $sql = "INSERT INTO login(user, password) VALUES ('". $username . "','". $encrypted . "');"; 
      $conn->query($sql);
      $sql = "SELECT login.user FROM login WHERE login.user = '". $username ."'";
      $result = $conn->query($sql);
      
      if($result->fetch_assoc()) 
      { 
        $res = '
        {
          "result": true
        }';
      }
      $conn->close();
    }

  return $res;
}



//check if given username is present in database and return result
function login($username, $password)
{
  // Create connection
  $conn = getConnection();
  $encrypted = md5($password);
  $sql = "SELECT login.password FROM login WHERE login.user = '". $username ."' AND password = '" . $encrypted . "'";
  $result = $conn->query($sql);

  if($result->fetch_assoc()) 
  { 
    $res = '
    {
      "result": true
    }';
  }
  else{
    $res = '
    {
      "result": false
    }';
  }

  $conn->close();
  return $res;
}


//update the result in 'bewertung'
function updateResult($Name, $medal, $score, $sportType)
{
  $conn = getConnection();
  $sql = "UPDATE bewertung
  SET punktzahl = '".$score."', medaille = '".$medal."'
  where sportartID = (Select sportartID from sportart where sportart = '".$sportType."')
  AND athletenID = (Select athletenID from athleten where name = '".$Name."')";
  $conn->query($sql);

  $sql = "SELECT bewertung.punktzahl, bewertung.medaille FROM bewertung 
  INNER JOIN sportart ON sportart.sportartID = bewertung.sportartID 
  INNER JOIN athleten on athleten.athletenID = bewertung.athletenID 
  WHERE sportart.sportart = '" . $sportType . "' 
  AND athleten.Name = '" . $Name . "'";
  ///echo $sql;
  $result = $conn->query($sql);
  //$result = $result->fetch_assoc();

  if($result->fetch_assoc()) 
  { 
    $res = '
    {
      "result": true
    }';
  }
  else{
    $res = '
    {
      "result": false
    }';
  }

  $conn->close();
  return $res;
}










//get result per every land
function getLandResult()
{

  //create connection
  $conn = getConnection();
  $sql = 'SELECT land.land, count(case bewertung.medaille when "Gold" then 1 else null end), count(case medaille when "Silber" then 1 else null end), count(case medaille when "Bronze" then 1 else null end) from land
  left join athleten on athleten.landID = land.landID
  left join bewertung on bewertung.athletenID = athleten.athletenID
  group by land';
  
  $result = $conn->query($sql);
  $conn->close();

  //erstellen eines json-Stings
  $res = '{"result": [ ';
    if($result->fetch_assoc() != ""){
    while($row = $result->fetch_assoc()) {
      $res = $res . 
      '{
          "country": "'.$row["land"].'", 
          "gold": '.$row['count(case bewertung.medaille when "Gold" then 1 else null end)'].', 
          "silver": '.$row['count(case medaille when "Silber" then 1 else null end)'].',
          "bronze": '.$row['count(case medaille when "Bronze" then 1 else null end)'].'
        }, ';
      }

      $res = substr($res, 0, -2) . " ] }";
    } else {
      $res = '{"result": [ {"Fehler": "Land falsch geschrieben oder kein Ergebnis." } } ]';
    }
    return $res;
  }


//get result per athlete from land selected
function getLandResultFromAthlete($land)
{
  //create connection
  $conn = getConnection();
  $sql = "SELECT athleten.name, sportart.sportart, bewertung.punktzahl, bewertung.medaille from athleten
  left join bewertung on bewertung.athletenID = athleten.athletenID
  left join sportart on sportart.sportartID = bewertung.sportartID
  inner join land on land.landID = athleten.landID
  where land = '". $land . "'";
  $result = $conn->query($sql);
  
  $conn->close();
  
  $res = '{"result": [ ';
    if($result->fetch_assoc() != ""){
    while($row = $result->fetch_assoc()) {
      $res = $res . 
      '{
          "name": "'.$row["name"].'", 
          "sportType": "'.$row["sportart"].'", 
          "score": "'.$row["punktzahl"].'",
          "medal": "'.$row["medaille"].'"
        }, ';
    }

    $res = substr($res, 0, -2) . " ] }";
  } else {
    $res = '{"result": [ {"Fehler": "Land falsch geschrieben oder kein Ergebnis." } } ]';
  }
  return $res;
}




//get all athletes from sport type selected
function getSportResultFromAthlete($sportType)
{
  // Create connection
  $conn = getConnection();

  $sql = "SELECT athleten.name, land.land, bewertung.punktzahl, bewertung.medaille 
  from athleten 
  left join bewertung on bewertung.athletenID = athleten.athletenID 
  inner join land on land.landID = athleten.landID 
  inner join sportart on sportart.sportartID = bewertung.sportartID
  where sportart.sportart = '". $sportType ."'";

  $result = $conn->query($sql);

  $conn->close();

  $res = '{"result": [ ';
    if($result->fetch_assoc() != ""){
    while($row = $result->fetch_assoc()) {
      $res = $res . 
      '{
        "name": "'.$row["name"].'",
        "country": "'.$row["land"].'",
        "score": "'.$row["punktzahl"].'",
        "medal": "'.$row["medaille"].'"
      } , ';
    }

    $res = substr($res, 0, -2) . " ] }";
  } else {
    $res = '{"result": [ {"Fehler": "Irgendwas falsch geschrieben oder kein Ergebnis." } } ]';
  }
  return $res;
}

?>