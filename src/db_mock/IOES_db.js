//Your mock datas here

export const userDictionary = {
    'admin@iyte.edu.tr': {password: 'admin123', role: 'admin'},
    'yusufbaran@iyte.edu.tr': {password: 'rektorbaran123', role: 'admin'},
    'samettenekeci@iyte.edu.tr': {password: 'samettenekeci123', role: 'admin'},
    'fatihguzel@std.iyte.edu.tr': {password: 'fatihguzel23', role: 'student'},
    'enisozgun@std.iyte.edu.tr': {password: 'enisozgun123', role: 'student'},
    'enesdogan@std.iyte.edu.tr': {password: 'enesdogan123', role: 'student'}
}

export const roleActionArray={
    "student":{
        array:[
            {
                subButtonArray:[
                    "Action 1","Action 2"
                ],
                subButtonAddress:[
                    "/url-1","/url-2"
                ]
            },
        ],
        text:"Student's Page"
    },
    "admin":{
        array:[
            {
                name:"Action 1",
                url:"/act-1",

            },
            {
                name:"Action 2",
                url:"/act-2",
                
            },
        ],
        text:"Admin's Page"
    }
}