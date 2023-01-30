import axios from "axios"
import router from '@/router/index';
import jwt_decode from 'jwt-decode';

export default { // ใช้สำหรับการดำเนินการเกี่ยวกับ State (ใช้ dispatch)
    async login(context, payload) {
        let data = {
            username: payload.username,
            password: payload.password
        }

        const res = await axios.post('https://student.psu.ac.th/sdamaster/api/authen/smartlogin', data)
        let dat = res.data
        if (dat.http == 403) { // throw Error When wrong user or non authorized
            const error = new Error(dat.data.message || "Failed")
            throw error

        } else if (dat.http == 422) {
            const error = new Error(dat.data.message || "Failed")
            throw error
        }

        context.commit('setUser', {
            token: dat.data.token,
            username: dat.data.username,
            role: dat.data.role,
            name: dat.data.name,
            web_group: dat.data.web_group
        })

        if (dat.data.web_group.length == 1) {
            context.commit('setActiveWG', dat.data.web_group[0])
            localStorage.setItem('sdama_activeWG_id', dat.data.web_group[0].wg_id);
        }

        localStorage.setItem('sdama_token', dat.data.token)


    },
    async tryLogin(context) {
        const token = localStorage.getItem('sdama_token');
        const activeWG_id = localStorage.getItem('sdama_activeWG_id');

        if (token != null) { //ถ้ามีใน localStorage
            try {
                const username = jwt_decode(token).data.username;
                const role = jwt_decode(token).data.role;
                const name = jwt_decode(token).data.name;
                const web_group = jwt_decode(token).data.web_group;
                const pos = web_group.findIndex(e => e.wg_id == activeWG_id);
                // console.log(pos)

                const active_wg = web_group[pos]
                    // console.log(active_wg)


                context.commit('setUser', { //mutation setUser
                    token: token,
                    username: username,
                    role: role,
                    name: name,
                    web_group: web_group
                })
                context.commit('setActiveWG', active_wg)

                // Login เพื่อตรวจสอบ
                const res = await axios.get('https://student.psu.ac.th/sdamaster/api/authen/userinfo', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })

                if (res.data.http != 200) { // ถ้ามีปัญหา ให้เด้งออกไป Login

                    context.dispatch('logout')
                    router.replace('/login')

                } else {
                    if (res.data.data.role != role || res.data.data.username != username) {
                        // username role ไม่ตรงกับฐานข้อมูล
                        // setLocalStorage ใหม่ + ส่งไปหน้า Main
                        localStorage.setItem('username', res.data.data.username)
                        localStorage.setItem('role', res.data.data.role)
                        router.replace('/')
                    }
                }



            } catch (error) {
                context.dispatch('logout')
                router.replace('/login')

            }
        }

    },
    setActiveWG(context, payload) {
        context.commit("setActiveWG", payload);
        localStorage.setItem('sdama_activeWG_id', payload.wg_id);
        router.go() // refresh
    },
    logout(context) {
        context.commit('setUser', {
            token: null,
            username: null,
            role: null,
            name: null,
        })
        context.commit('setActiveWG', null)
        localStorage.removeItem('sdama_token')
        localStorage.removeItem('sdama_activeWG_id');

        router.replace('/login')
    }
}