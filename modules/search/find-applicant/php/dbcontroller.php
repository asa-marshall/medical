<?php
// File: dbcontroller.php
// Use by all php files to access database
//
class DBController {

    private $conn;

     //Needs to be changed based on hosting conditions.
	private $host = "localhost";
	private $user = "root";
	private $password = "";
    private $database ="s94gccodec_master_SP2019_Feb19";


    /*
	private $host = "localhost";
	private $user = "s94gccodec";
	private $password = "CSCI4320_2";
	private $database = "s94gccodec_minerva_S2020";
     */

	function __construct() {
		$this->conn = $this->connectDB();
	}
	
	function connectDB() { //Used to establish the connection between the client and server.
		$conn = mysqli_connect($this->host,$this->user,$this->password,$this->database);
		return $conn;
	}
	
	function createRecord($query) //Used to create a record - display object with id of value inserted
	{
		$conn = mysqli_connect($this->host,$this->user,$this->password,$this->database);
		if($conn->query($query) == TRUE) {

            $last_id = $conn->insert_id;
            //show the id of the record
			echo '{ "id":'. $last_id. ', "status":"New record(s) created successfully"}';
			return $last_id;
		} 
		else {
		    echo '{"status": "error", "statusText":"Error: ' . $query. ' - ' . $conn->error.'"}';
		    return false;
		}
	}
    function createNewRecord($query) //Used to create a record - display object with id of value inserted
    {
        $conn = mysqli_connect($this->host,$this->user,$this->password,$this->database);
        if($conn->query($query) == TRUE) {

            $last_id = $conn->insert_id;
            $status = "ok";
            $result = true;

            $output = array();
            $output['id'] = $last_id;
            $output['status'] = $status;
            $output['result'] = $result;
            return $output;
        }
        else {
            $errorMsg = "Error: ' . $query. ' - ' . $conn->error.'";
            $status = "error";
            $result = false;

            $output = array();
            $output['errorMsg'] = $errorMsg;
            $output['status'] = $status;
            $output['result'] = $result;
            return $output;
        }
    }

    function runSelectQuery($query) //Used to run a select query
    {
         $result = mysqli_query($this->conn,$query);
         return $result;
    }

    function sanitize($str) // used to sanitize string
    {
       $safe_str =  mysqli_real_escape_string($this->conn, $str);

      // $safe_str = $mysqli->real_escape_string($str);

       return $safe_str;
    }

   function runSelectQueryArray($query) //Used to run a select query and return array of rows
    {
        //echo $query;
         $result = mysqli_query($this->conn,$query);
         $result_array = array();

         if ($result->num_rows > 0) {
           $count = 0;
           while ($row = $result->fetch_assoc()) {
               $temp = $row;

               //convert escape sequences to proper html code.
               foreach($temp as $key=> $value)
               {
                   $temp[$key] = $this->sanitize($value);
                   $temp[$key] = htmlentities($value, ENT_QUOTES, "UTF-8");
               }
                $result_array[] = $temp;
              }
           }

         return $result_array;  //returns an empty array if error
     }

     //does not convert to html code
    function runSelectQueryArrayNotEncoded($query) //Used to run a select query and return array of rows
    {
        $result = mysqli_query($this->conn,$query);
        $result_array = array();


        if ($result->num_rows > 0) {
            $count = 0;
            while ($row = $result->fetch_assoc()) {
                $temp = $row;

                //DOES NOT convert escape sequences to proper html code.
                foreach($temp as $key=> $value)
                {
                    $temp[$key] = $value;
                }
                $result_array[] = $temp;
            }
        }

        return $result_array;  //returns an empty array if error
    }

    function runDeleteQuery($query)
     {
           $result = mysqli_query($this->conn,$query);

            if ($result === TRUE) {
                echo '{"status": "ok", "statusText": "Record deleted successfully"}';
                return true;
            } else {
                echo '{"status": "error", "statusText":"Error deleting record: ' . $this->conn->error.'"}';
                return false;
            }
       }
    function runSimpleDeleteQuery($query)
    {
        //$result be TRUE even if 0 records were deleted.
        $result = mysqli_query($this->conn,$query);
        $affected_rows= mysqli_affected_rows($this->conn);

        $status = "ok";
        $statusText = "Record deleted successfully";
        $data = true;
        if ($result === TRUE) {
            $status = "ok";
            $affected_rows= mysqli_affected_rows($this->conn);
            $statusText = "Record deleted successfully";
            $data = true;
        } else {
            $status = "error";
            $affected_rows="";
            $statusText ="Error deleting record: ' . $this->conn->error.'";
            $data = false;
        }
        $output = array();
        $output['status'] = $status;
        $output['statusText'] = $statusText;
        $output['affected_rows']=$affected_rows;
        $output['result'] = $data;
        return $output;
    }
	function runQuery($query) { //Used to run an inserted query to the server
		$result = mysqli_query($this->conn,$query);
		if($result == false) {
			return false;
		}
		if($result === true) {
			return true;
		}
		while($row=mysqli_fetch_assoc($result)) {
			$resultset[] = $row;
		}		
		if(!empty($resultset))
			return $resultset;
	}
	
	function numRows($query) { //Checks to see if there are any records that meet the query inputted
		$result  = mysqli_query($this->conn,$query);
		if ($result)
		{
			$rowcount = mysqli_num_rows($result);
		}
		else
		{
			$rowcount = false;
		}
		return $rowcount;	
	}

    function makeObject($row, $fieldNames)
    {
        //Create array of field names
        $fieldArray = explode(", ", $fieldNames);
        $length = count($fieldArray);
        $count = 0;
        $str = "{";

        while($count < $length)
        {
            $field = $fieldArray[$count];

            //display comma
            if ($count >0 )
                $str = $str .  ",";

            //format output as an object -- specify each field along with its value
            $str=  $str . '"' .$field. '": "'.  $row[$field]. '" ';

            ++$count;
        }
        $str = $str .  '}';

        return $str;
    }


    function display($result, $fields)
    {
        //$result is an array, num_rows provides length of array
        if ($result->num_rows > 0)
        {
             $count=0;

            //Create JSON object
            while($row = $result->fetch_assoc()) {
                //display comma
                if ($count >0 )
                    echo ",";
                echo  $this->makeObject($row, $fields);
                $count = $count+1;
            }
        }
    }
    function getRightFormat($date)
    {
        $valid = strtotime($date);
        $valid = date('Y-m-d', $valid);
        return $valid;
    }

    /**
     * Creates the insertion string given a table name and post parameters.
     *
     * - Parameters:
     *   - $table_name: The name of the table the data is being inserted in
     *   - $post: The associative array containing the key value pairs for the
     *   new record being inserted
     */
    function createInsertionString($table_name, $post) {

        //get  field names for table
        $sql = "select * from $table_name";
        $result = $this->runSelectQuery($sql);
        $fieldinfo = mysqli_fetch_fields($result);

        foreach ($fieldinfo as $val) {
            $fieldName = $val->name;

            //MARK: Consider there may be fields in table that are not sent as POST
            //MARK Get all Fields from table and only add the fields that were sent via POST
            if (isset($post[$fieldName])) {
                $keys[] = $fieldName;
                $values[] = $post[$fieldName];
            }
        }

        // $keys = array_keys($data);
        //$values = array_values($data);

        $valarray = array();

        //prevent sql injection for all input fields
        for($i = 0; $i<sizeOf($values);$i++){
            $values[$i]=str_replace('"', "'", $values[$i]);
            $values[$i]=str_replace("\\", "/", $values[$i]);
            $values[$i]=filter_var($values[$i], FILTER_SANITIZE_ENCODED);
            array_push($valarray,$values[$i]);
        }

        $keys_str = implode(", ", $keys);
        $values_str = "\"".implode("\", \"", $valarray)."\"";
        return "INSERT INTO $table_name ($keys_str) VALUES ($values_str);";
    }

}
// in prap_gettCadetClassDetails.php originally would print an empty string because not all of the data
// was utf8 encoded. This fixes an array to have utf8 encoding.
// https://stackoverflow.com/questions/19361282/why-would-json-encode-return-an-empty-string
// This code is placed in app.config, a more global file, in case other files encounter the
// same issue.
function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }
    return $d;
}




?>
