const db = require('../configs/db/connectDB');

module.exports = {
    addUser: async obj => {
        const rs = await db.one('INSERT INTO public."Users"("Username","Password", "id") VALUES ($1,$2,$3) RETURNING *', [obj.username, obj.password, obj.id]);
        return rs;
    },

    selectUser: async user => {
        const rs = await db.any('SELECT * FROM public."Users" WHERE "Users"."Username" =$1', [user]);
        return (rs);
    },

    selectAllUser: async() => {
        const rs = await db.any('SELECT "Users"."Username" FROM public."Users"');
        return (rs);
    },

    isExistUser: async user => {
        let isexist = false;
        const rs = await db.any('SELECT "Users"."Username" FROM public."Users"');
        for (let i = 0; i < rs.length; i++) {
            if (user == rs[i].Username) {
                isexist = true;
            }
        }
        return isexist;
    },

    selectMaxID: async() => {
        const rs = await db.any('SELECT MAX("id") FROM public."Users"');
        if (rs.max == null) {
            return 0;
        } else return rs.max;
    }
}