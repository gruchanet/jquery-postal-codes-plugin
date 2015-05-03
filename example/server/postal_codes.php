<?php

$postalCode = $_GET['code'];

$postalCodes = parse_postal_codes_csv('codes.csv', ';');

$city = isset($postalCodes[$postalCode]) ? $postalCodes[$postalCode]['MIEJSCOWOŚĆ'] : null;

echo(json_encode(
    array('city' => $city)
));

/**
 * Convert a comma separated file into an associated array.
 * The first row should contain the array keys.
 *
 * Example:
 *
 * @param string $filename Path to the CSV file
 * @param string $delimiter The separator used in the file
 * @return array
 * @link http://gist.github.com/385876
 * @author Jay Williams <http://myd3.com/>
 * @copyright Copyright (c) 2010, Jay Williams
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 *
 * @edited grucha_net
 */
function parse_postal_codes_csv($filename='', $delimiter=',')
{
    if (!file_exists($filename) || !is_readable($filename)) {
        return false;
    }

    $header = null;
    $data = array();
    if (($handle = fopen($filename, 'r')) !== false) {
        while (($row = fgetcsv($handle, 1000, $delimiter)) !== false) {
            if (!$header) {
                $header = $row;
            }
            else {
                $data[$row[0]] = array_combine($header, $row);
            }
        }
        fclose($handle);
    }

    return $data;
}