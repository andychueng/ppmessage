Service.$flags = (function() {

    var DIAL_CODES = {
        af: {
            dialCode: "93",
            areaCodes: null,
            priority: 0
        },
        al: {
            dialCode: "355",
            areaCodes: null,
            priority: 0
        },
        dz: {
            dialCode: "213",
            areaCodes: null,
            priority: 0
        },
        as: {
            dialCode: "1684",
            areaCodes: null,
            priority: 0
        },
        ad: {
            dialCode: "376",
            areaCodes: null,
            priority: 0
        },
        ao: {
            dialCode: "244",
            areaCodes: null,
            priority: 0
        },
        ai: {
            dialCode: "1264",
            areaCodes: null,
            priority: 0
        },
        ag: {
            dialCode: "1268",
            areaCodes: null,
            priority: 0
        },
        ar: {
            dialCode: "54",
            areaCodes: null,
            priority: 0
        },
        am: {
            dialCode: "374",
            areaCodes: null,
            priority: 0
        },
        aw: {
            dialCode: "297",
            areaCodes: null,
            priority: 0
        },
        au: {
            dialCode: "61",
            areaCodes: null,
            priority: 0
        },
        at: {
            dialCode: "43",
            areaCodes: null,
            priority: 0
        },
        az: {
            dialCode: "994",
            areaCodes: null,
            priority: 0
        },
        bs: {
            dialCode: "1242",
            areaCodes: null,
            priority: 0
        },
        bh: {
            dialCode: "973",
            areaCodes: null,
            priority: 0
        },
        bd: {
            dialCode: "880",
            areaCodes: null,
            priority: 0
        },
        bb: {
            dialCode: "1246",
            areaCodes: null,
            priority: 0
        },
        by: {
            dialCode: "375",
            areaCodes: null,
            priority: 0
        },
        be: {
            dialCode: "32",
            areaCodes: null,
            priority: 0
        },
        bz: {
            dialCode: "501",
            areaCodes: null,
            priority: 0
        },
        bj: {
            dialCode: "229",
            areaCodes: null,
            priority: 0
        },
        bm: {
            dialCode: "1441",
            areaCodes: null,
            priority: 0
        },
        bt: {
            dialCode: "975",
            areaCodes: null,
            priority: 0
        },
        bo: {
            dialCode: "591",
            areaCodes: null,
            priority: 0
        },
        ba: {
            dialCode: "387",
            areaCodes: null,
            priority: 0
        },
        bw: {
            dialCode: "267",
            areaCodes: null,
            priority: 0
        },
        br: {
            dialCode: "55",
            areaCodes: null,
            priority: 0
        },
        io: {
            dialCode: "246",
            areaCodes: null,
            priority: 0
        },
        vg: {
            dialCode: "1284",
            areaCodes: null,
            priority: 0
        },
        bn: {
            dialCode: "673",
            areaCodes: null,
            priority: 0
        },
        bg: {
            dialCode: "359",
            areaCodes: null,
            priority: 0
        },
        bf: {
            dialCode: "226",
            areaCodes: null,
            priority: 0
        },
        bi: {
            dialCode: "257",
            areaCodes: null,
            priority: 0
        },
        kh: {
            dialCode: "855",
            areaCodes: null,
            priority: 0
        },
        cm: {
            dialCode: "237",
            areaCodes: null,
            priority: 0
        },
        ca: {
            dialCode: "1",
            areaCodes: ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"],
            priority: 1
        },
        cv: {
            dialCode: "238",
            areaCodes: null,
            priority: 0
        },
        bq: {
            dialCode: "599",
            areaCodes: null,
            priority: 1
        },
        ky: {
            dialCode: "1345",
            areaCodes: null,
            priority: 0
        },
        cf: {
            dialCode: "236",
            areaCodes: null,
            priority: 0
        },
        td: {
            dialCode: "235",
            areaCodes: null,
            priority: 0
        },
        cl: {
            dialCode: "56",
            areaCodes: null,
            priority: 0
        },
        cn: {
            dialCode: "86",
            areaCodes: null,
            priority: 0
        },
        cx: {
            dialCode: "61",
            areaCodes: null,
            priority: 2
        },
        cc: {
            dialCode: "61",
            areaCodes: null,
            priority: 1
        },
        co: {
            dialCode: "57",
            areaCodes: null,
            priority: 0
        },
        km: {
            dialCode: "269",
            areaCodes: null,
            priority: 0
        },
        cd: {
            dialCode: "243",
            areaCodes: null,
            priority: 0
        },
        cg: {
            dialCode: "242",
            areaCodes: null,
            priority: 0
        },
        ck: {
            dialCode: "682",
            areaCodes: null,
            priority: 0
        },
        cr: {
            dialCode: "506",
            areaCodes: null,
            priority: 0
        },
        ci: {
            dialCode: "225",
            areaCodes: null,
            priority: 0
        },
        hr: {
            dialCode: "385",
            areaCodes: null,
            priority: 0
        },
        cu: {
            dialCode: "53",
            areaCodes: null,
            priority: 0
        },
        cw: {
            dialCode: "599",
            areaCodes: null,
            priority: 0
        },
        cy: {
            dialCode: "357",
            areaCodes: null,
            priority: 0
        },
        cz: {
            dialCode: "420",
            areaCodes: null,
            priority: 0
        },
        dk: {
            dialCode: "45",
            areaCodes: null,
            priority: 0
        },
        dj: {
            dialCode: "253",
            areaCodes: null,
            priority: 0
        },
        dm: {
            dialCode: "1767",
            areaCodes: null,
            priority: 0
        },
        do: {
            dialCode: "1",
            areaCodes: ["809", "829", "849"],
            priority: 2
        },
        ec: {
            dialCode: "593",
            areaCodes: null,
            priority: 0
        },
        eg: {
            dialCode: "20",
            areaCodes: null,
            priority: 0
        },
        sv: {
            dialCode: "503",
            areaCodes: null,
            priority: 0
        },
        gq: {
            dialCode: "240",
            areaCodes: null,
            priority: 0
        },
        er: {
            dialCode: "291",
            areaCodes: null,
            priority: 0
        },
        ee: {
            dialCode: "372",
            areaCodes: null,
            priority: 0
        },
        et: {
            dialCode: "251",
            areaCodes: null,
            priority: 0
        },
        fk: {
            dialCode: "500",
            areaCodes: null,
            priority: 0
        },
        fo: {
            dialCode: "298",
            areaCodes: null,
            priority: 0
        },
        fj: {
            dialCode: "679",
            areaCodes: null,
            priority: 0
        },
        fi: {
            dialCode: "358",
            areaCodes: null,
            priority: 0
        },
        fr: {
            dialCode: "33",
            areaCodes: null,
            priority: 0
        },
        gf: {
            dialCode: "594",
            areaCodes: null,
            priority: 0
        },
        pf: {
            dialCode: "689",
            areaCodes: null,
            priority: 0
        },
        ga: {
            dialCode: "241",
            areaCodes: null,
            priority: 0
        },
        gm: {
            dialCode: "220",
            areaCodes: null,
            priority: 0
        },
        ge: {
            dialCode: "995",
            areaCodes: null,
            priority: 0
        },
        de: {
            dialCode: "49",
            areaCodes: null,
            priority: 0
        },
        gh: {
            dialCode: "233",
            areaCodes: null,
            priority: 0
        },
        gi: {
            dialCode: "350",
            areaCodes: null,
            priority: 0
        },
        gr: {
            dialCode: "30",
            areaCodes: null,
            priority: 0
        },
        gl: {
            dialCode: "299",
            areaCodes: null,
            priority: 0
        },
        gd: {
            dialCode: "1473",
            areaCodes: null,
            priority: 0
        },
        gp: {
            dialCode: "590",
            areaCodes: null,
            priority: 0
        },
        gu: {
            dialCode: "1671",
            areaCodes: null,
            priority: 0
        },
        gt: {
            dialCode: "502",
            areaCodes: null,
            priority: 0
        },
        gg: {
            dialCode: "44",
            areaCodes: null,
            priority: 1
        },
        gn: {
            dialCode: "224",
            areaCodes: null,
            priority: 0
        },
        gw: {
            dialCode: "245",
            areaCodes: null,
            priority: 0
        },
        gy: {
            dialCode: "592",
            areaCodes: null,
            priority: 0
        },
        ht: {
            dialCode: "509",
            areaCodes: null,
            priority: 0
        },
        hn: {
            dialCode: "504",
            areaCodes: null,
            priority: 0
        },
        hk: {
            dialCode: "852",
            areaCodes: null,
            priority: 0
        },
        hu: {
            dialCode: "36",
            areaCodes: null,
            priority: 0
        },
        is: {
            dialCode: "354",
            areaCodes: null,
            priority: 0
        },
            in: {
                dialCode: "91",
                areaCodes: null,
                priority: 0
            },
        id: {
            dialCode: "62",
            areaCodes: null,
            priority: 0
        },
        ir: {
            dialCode: "98",
            areaCodes: null,
            priority: 0
        },
        iq: {
            dialCode: "964",
            areaCodes: null,
            priority: 0
        },
        ie: {
            dialCode: "353",
            areaCodes: null,
            priority: 0
        },
        im: {
            dialCode: "44",
            areaCodes: null,
            priority: 2
        },
        il: {
            dialCode: "972",
            areaCodes: null,
            priority: 0
        },
        it: {
            dialCode: "39",
            areaCodes: null,
            priority: 0
        },
        jm: {
            dialCode: "1876",
            areaCodes: null,
            priority: 0
        },
        jp: {
            dialCode: "81",
            areaCodes: null,
            priority: 0
        },
        je: {
            dialCode: "44",
            areaCodes: null,
            priority: 3
        },
        jo: {
            dialCode: "962",
            areaCodes: null,
            priority: 0
        },
        kz: {
            dialCode: "7",
            areaCodes: null,
            priority: 1
        },
        ke: {
            dialCode: "254",
            areaCodes: null,
            priority: 0
        },
        ki: {
            dialCode: "686",
            areaCodes: null,
            priority: 0
        },
        xk: {
            dialCode: "383",
            areaCodes: null,
            priority: 0
        },
        kw: {
            dialCode: "965",
            areaCodes: null,
            priority: 0
        },
        kg: {
            dialCode: "996",
            areaCodes: null,
            priority: 0
        },
        la: {
            dialCode: "856",
            areaCodes: null,
            priority: 0
        },
        lv: {
            dialCode: "371",
            areaCodes: null,
            priority: 0
        },
        lb: {
            dialCode: "961",
            areaCodes: null,
            priority: 0
        },
        ls: {
            dialCode: "266",
            areaCodes: null,
            priority: 0
        },
        lr: {
            dialCode: "231",
            areaCodes: null,
            priority: 0
        },
        ly: {
            dialCode: "218",
            areaCodes: null,
            priority: 0
        },
        li: {
            dialCode: "423",
            areaCodes: null,
            priority: 0
        },
        lt: {
            dialCode: "370",
            areaCodes: null,
            priority: 0
        },
        lu: {
            dialCode: "352",
            areaCodes: null,
            priority: 0
        },
        mo: {
            dialCode: "853",
            areaCodes: null,
            priority: 0
        },
        mk: {
            dialCode: "389",
            areaCodes: null,
            priority: 0
        },
        mg: {
            dialCode: "261",
            areaCodes: null,
            priority: 0
        },
        mw: {
            dialCode: "265",
            areaCodes: null,
            priority: 0
        },
        my: {
            dialCode: "60",
            areaCodes: null,
            priority: 0
        },
        mv: {
            dialCode: "960",
            areaCodes: null,
            priority: 0
        },
        ml: {
            dialCode: "223",
            areaCodes: null,
            priority: 0
        },
        mt: {
            dialCode: "356",
            areaCodes: null,
            priority: 0
        },
        mh: {
            dialCode: "692",
            areaCodes: null,
            priority: 0
        },
        mq: {
            dialCode: "596",
            areaCodes: null,
            priority: 0
        },
        mr: {
            dialCode: "222",
            areaCodes: null,
            priority: 0
        },
        mu: {
            dialCode: "230",
            areaCodes: null,
            priority: 0
        },
        yt: {
            dialCode: "262",
            areaCodes: null,
            priority: 1
        },
        mx: {
            dialCode: "52",
            areaCodes: null,
            priority: 0
        },
        fm: {
            dialCode: "691",
            areaCodes: null,
            priority: 0
        },
        md: {
            dialCode: "373",
            areaCodes: null,
            priority: 0
        },
        mc: {
            dialCode: "377",
            areaCodes: null,
            priority: 0
        },
        mn: {
            dialCode: "976",
            areaCodes: null,
            priority: 0
        },
        me: {
            dialCode: "382",
            areaCodes: null,
            priority: 0
        },
        ms: {
            dialCode: "1664",
            areaCodes: null,
            priority: 0
        },
        ma: {
            dialCode: "212",
            areaCodes: null,
            priority: 0
        },
        mz: {
            dialCode: "258",
            areaCodes: null,
            priority: 0
        },
        mm: {
            dialCode: "95",
            areaCodes: null,
            priority: 0
        },
        na: {
            dialCode: "264",
            areaCodes: null,
            priority: 0
        },
        nr: {
            dialCode: "674",
            areaCodes: null,
            priority: 0
        },
        np: {
            dialCode: "977",
            areaCodes: null,
            priority: 0
        },
        nl: {
            dialCode: "31",
            areaCodes: null,
            priority: 0
        },
        nc: {
            dialCode: "687",
            areaCodes: null,
            priority: 0
        },
        nz: {
            dialCode: "64",
            areaCodes: null,
            priority: 0
        },
        ni: {
            dialCode: "505",
            areaCodes: null,
            priority: 0
        },
        ne: {
            dialCode: "227",
            areaCodes: null,
            priority: 0
        },
        ng: {
            dialCode: "234",
            areaCodes: null,
            priority: 0
        },
        nu: {
            dialCode: "683",
            areaCodes: null,
            priority: 0
        },
        nf: {
            dialCode: "672",
            areaCodes: null,
            priority: 0
        },
        kp: {
            dialCode: "850",
            areaCodes: null,
            priority: 0
        },
        mp: {
            dialCode: "1670",
            areaCodes: null,
            priority: 0
        },
        no: {
            dialCode: "47",
            areaCodes: null,
            priority: 0
        },
        om: {
            dialCode: "968",
            areaCodes: null,
            priority: 0
        },
        pk: {
            dialCode: "92",
            areaCodes: null,
            priority: 0
        },
        pw: {
            dialCode: "680",
            areaCodes: null,
            priority: 0
        },
        ps: {
            dialCode: "970",
            areaCodes: null,
            priority: 0
        },
        pa: {
            dialCode: "507",
            areaCodes: null,
            priority: 0
        },
        pg: {
            dialCode: "675",
            areaCodes: null,
            priority: 0
        },
        py: {
            dialCode: "595",
            areaCodes: null,
            priority: 0
        },
        pe: {
            dialCode: "51",
            areaCodes: null,
            priority: 0
        },
        ph: {
            dialCode: "63",
            areaCodes: null,
            priority: 0
        },
        pl: {
            dialCode: "48",
            areaCodes: null,
            priority: 0
        },
        pt: {
            dialCode: "351",
            areaCodes: null,
            priority: 0
        },
        pr: {
            dialCode: "1",
            areaCodes: ["787", "939"],
            priority: 3
        },
        qa: {
            dialCode: "974",
            areaCodes: null,
            priority: 0
        },
        re: {
            dialCode: "262",
            areaCodes: null,
            priority: 0
        },
        ro: {
            dialCode: "40",
            areaCodes: null,
            priority: 0
        },
        ru: {
            dialCode: "7",
            areaCodes: null,
            priority: 0
        },
        rw: {
            dialCode: "250",
            areaCodes: null,
            priority: 0
        },
        bl: {
            dialCode: "590",
            areaCodes: null,
            priority: 1
        },
        sh: {
            dialCode: "290",
            areaCodes: null,
            priority: 0
        },
        kn: {
            dialCode: "1869",
            areaCodes: null,
            priority: 0
        },
        lc: {
            dialCode: "1758",
            areaCodes: null,
            priority: 0
        },
        mf: {
            dialCode: "590",
            areaCodes: null,
            priority: 2
        },
        pm: {
            dialCode: "508",
            areaCodes: null,
            priority: 0
        },
        vc: {
            dialCode: "1784",
            areaCodes: null,
            priority: 0
        },
        ws: {
            dialCode: "685",
            areaCodes: null,
            priority: 0
        },
        sm: {
            dialCode: "378",
            areaCodes: null,
            priority: 0
        },
        st: {
            dialCode: "239",
            areaCodes: null,
            priority: 0
        },
        sa: {
            dialCode: "966",
            areaCodes: null,
            priority: 0
        },
        sn: {
            dialCode: "221",
            areaCodes: null,
            priority: 0
        },
        rs: {
            dialCode: "381",
            areaCodes: null,
            priority: 0
        },
        sc: {
            dialCode: "248",
            areaCodes: null,
            priority: 0
        },
        sl: {
            dialCode: "232",
            areaCodes: null,
            priority: 0
        },
        sg: {
            dialCode: "65",
            areaCodes: null,
            priority: 0
        },
        sx: {
            dialCode: "1721",
            areaCodes: null,
            priority: 0
        },
        sk: {
            dialCode: "421",
            areaCodes: null,
            priority: 0
        },
        si: {
            dialCode: "386",
            areaCodes: null,
            priority: 0
        },
        sb: {
            dialCode: "677",
            areaCodes: null,
            priority: 0
        },
        so: {
            dialCode: "252",
            areaCodes: null,
            priority: 0
        },
        za: {
            dialCode: "27",
            areaCodes: null,
            priority: 0
        },
        kr: {
            dialCode: "82",
            areaCodes: null,
            priority: 0
        },
        ss: {
            dialCode: "211",
            areaCodes: null,
            priority: 0
        },
        es: {
            dialCode: "34",
            areaCodes: null,
            priority: 0
        },
        lk: {
            dialCode: "94",
            areaCodes: null,
            priority: 0
        },
        sd: {
            dialCode: "249",
            areaCodes: null,
            priority: 0
        },
        sr: {
            dialCode: "597",
            areaCodes: null,
            priority: 0
        },
        sj: {
            dialCode: "47",
            areaCodes: null,
            priority: 1
        },
        sz: {
            dialCode: "268",
            areaCodes: null,
            priority: 0
        },
        se: {
            dialCode: "46",
            areaCodes: null,
            priority: 0
        },
        ch: {
            dialCode: "41",
            areaCodes: null,
            priority: 0
        },
        sy: {
            dialCode: "963",
            areaCodes: null,
            priority: 0
        },
        tw: {
            dialCode: "886",
            areaCodes: null,
            priority: 0
        },
        tj: {
            dialCode: "992",
            areaCodes: null,
            priority: 0
        },
        tz: {
            dialCode: "255",
            areaCodes: null,
            priority: 0
        },
        th: {
            dialCode: "66",
            areaCodes: null,
            priority: 0
        },
        tl: {
            dialCode: "670",
            areaCodes: null,
            priority: 0
        },
        tg: {
            dialCode: "228",
            areaCodes: null,
            priority: 0
        },
        tk: {
            dialCode: "690",
            areaCodes: null,
            priority: 0
        },
        to: {
            dialCode: "676",
            areaCodes: null,
            priority: 0
        },
        tt: {
            dialCode: "1868",
            areaCodes: null,
            priority: 0
        },
        tn: {
            dialCode: "216",
            areaCodes: null,
            priority: 0
        },
        tr: {
            dialCode: "90",
            areaCodes: null,
            priority: 0
        },
        tm: {
            dialCode: "993",
            areaCodes: null,
            priority: 0
        },
        tc: {
            dialCode: "1649",
            areaCodes: null,
            priority: 0
        },
        tv: {
            dialCode: "688",
            areaCodes: null,
            priority: 0
        },
        vi: {
            dialCode: "1340",
            areaCodes: null,
            priority: 0
        },
        ug: {
            dialCode: "256",
            areaCodes: null,
            priority: 0
        },
        ua: {
            dialCode: "380",
            areaCodes: null,
            priority: 0
        },
        ae: {
            dialCode: "971",
            areaCodes: null,
            priority: 0
        },
        gb: {
            dialCode: "44",
            areaCodes: null,
            priority: 0
        },
        us: {
            dialCode: "1",
            areaCodes: null,
            priority: 0
        },
        uy: {
            dialCode: "598",
            areaCodes: null,
            priority: 0
        },
        uz: {
            dialCode: "998",
            areaCodes: null,
            priority: 0
        },
        vu: {
            dialCode: "678",
            areaCodes: null,
            priority: 0
        },
        va: {
            dialCode: "39",
            areaCodes: null,
            priority: 1
        },
        ve: {
            dialCode: "58",
            areaCodes: null,
            priority: 0
        },
        vn: {
            dialCode: "84",
            areaCodes: null,
            priority: 0
        },
        wf: {
            dialCode: "681",
            areaCodes: null,
            priority: 0
        },
        eh: {
            dialCode: "212",
            areaCodes: null,
            priority: 1
        },
        ye: {
            dialCode: "967",
            areaCodes: null,
            priority: 0
        },
        zm: {
            dialCode: "260",
            areaCodes: null,
            priority: 0
        },
        zw: {
            dialCode: "263",
            areaCodes: null,
            priority: 0
        },
        ax: {
            dialCode: "358",
            areaCodes: null,
            priority: 1
        }
    };

    return {
        query: function( country ) {
            return DIAL_CODES[ country ];
        }
    }
    
}());
