var mysql = require('mysql'),
q = require('q');

exports.load = (sql) => {

var d = q.defer();

var connection  = mysql.createConnection({  
    host: 'sql9.freemysqlhosting.net',
    user: 'sql9203456',
    password: 'IuIGiLViV4',
    database: 'sql9203456'

}); 
connection.connect();

    connection.query(sql, function(error, results, fields) {  
        if (error) {
            console.log(error);
            d.reject(error);
        } else {
            d.resolve(results);
        }
    
        connection.end();
    }); 


return d.promise;
};
