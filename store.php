<?php
header("Access-Control-Allow-Origin: *");

if(!empty($_FILES)) {
    $file_path_dir = "uploads";

    try {
        foreach ($_FILES as $key => $file) {
            $store_path = sprintf("%s/%s", $file_path_dir, $file['name']);

            if (!move_uploaded_file($file['tmp_name'], $store_path)) {
                throw new Exception('ファイルの保存に失敗しました');
            }
        }
        $response =  [
            'success' => true,
            'message' => ''
        ];
    } catch(Exception $e) {
        $response = [
            'success' => false,
            'message' => $e->getMessage()
        ];
    }

    echo json_encode($response);

} else {
    echo json_encode([
        'success' => false,
        'message' => 'FILE None'
    ]);
}
