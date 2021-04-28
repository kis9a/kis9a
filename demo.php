function pdo_trans($pdo,$querys,$datas,$pdoOpt=null){
	if(!isset($pdo)||!isset($querys))
		return false;
	if($pdoOpt==null)$pdoOpt=PDO::FETCH_ASSOC;
	$mod = $pdo->getAttribute(PDO::ATTR_ERRMODE);
	$pdo->setAttribute(PDO::ATTR_AUTOCOMMIT, 0 );
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$cnt = 0;
	$res = true;
	try{
		$pdo->beginTransaction();
		if(is_callable($querys)){
			$cnt = $querys($pdo);
		}else if(is_array($querys)){
			$i=0;
			foreach($querys as $q){
				$i++;
				if($q==='@rollback'){
					$pdo->rollBack();$cnt--;
				}else{
					$statement = $pdo->prepare($q);
					if(!$statement){
						error_log("PDO TRANS Failed : ".$pdo->errorInfo());
						continue;
					}
					$data = isset($datas[$i-1])?$datas[$i-1]:[];
					if ($statement->execute($data) == false) {
						error_log("PDO TRANS Failed : ".$pdo->errorInfo());
						continue;
					}
					if(str_starts(strtolower($q), 'select')){
						$res = $statement->fetchAll($pdoOpt);					
					}
					$cnt++;
				}
			}
		}
		if($cnt>0)
			$pdo->commit();
		else
			$pdo->rollBack();
	}catch(Exception $e){
		error_log('DB Transaction ERR:'.$e->getMessage());
		$data = [
			'trace' => $e->getTraceAsString(),
			'code' => $e->getCode(),
			'msg' => $e->getMessage(),
		];
		exception_save($data);

		$pdo->rollBack();
        $res = false;
	}
	$pdo->setAttribute(PDO::ATTR_AUTOCOMMIT, 1);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, $mod);
	return $res;
}
