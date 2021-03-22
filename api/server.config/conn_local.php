<?

ini_set('display_errors', 'Off');
error_reporting(0);

Class Connection {

	private $conexion;

	public function __construct(){
		$servidor = "localhost";
		$usuario  = "root";
		$clave    = "root"; // lex123
		//$clave    = ""; // lex123
		$base	  = "lextracking_dev";
		$this->conexion = mysql_connect($servidor, $usuario, $clave)
			or die('No se pudo conectar: ' . mysql_error());
		mysql_set_charset('utf8', $this->conexion);
		mysql_select_db($base, $this->conexion) or die('No se pudo seleccionar la base de datos');
	}

	public function __destruct(){

	}

	public function query($sql){
		$resultado = mysql_query($sql) or die('Consulta fallida: ' . mysql_error());
		$datos = "";
		//guardamos en un array
		while($fila =  mysql_fetch_array($resultado, MYSQL_ASSOC)){
			$datos[] = $fila;
		}    	
		// Liberar resultados
		mysql_free_result($resultado);

		return $datos;
	}

	public function close(){
		mysql_close($this->conexion);
	}

}
?>

