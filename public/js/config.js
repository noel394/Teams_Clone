turnConfig={
    iceServers: [
        {
            urls: [ "stun:bn-turn1.xirsys.com" ]
        }, 
        {   
            username: "Byl7IkWJyMqGH2xO_mdQImVf1TfmD5lduMx6NbO7c0Sj3EN7LbZfG0wNRy-2iYhkAAAAAGDMuExhYW5kYW4=",   
            credential: "db481382-d047-11eb-9ccc-0242ac140004",   
            urls: [       
                "turn:bn-turn1.xirsys.com:80?transport=udp",       
                "turn:bn-turn1.xirsys.com:3478?transport=udp",       
                "turn:bn-turn1.xirsys.com:80?transport=tcp",       
                "turn:bn-turn1.xirsys.com:3478?transport=tcp",       
                "turns:bn-turn1.xirsys.com:443?transport=tcp",       
                "turns:bn-turn1.xirsys.com:5349?transport=tcp"   
            ]
        }
    ]
}
