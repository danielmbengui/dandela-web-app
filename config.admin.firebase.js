// Your web app's Firebase configuration
const adminFirebaseConfig = {
    type: "service_account",
    project_id: "dandelawebapp",
    private_key_id: process.env.FIREBASE_PRIVATE_KEY,
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC95NEJwrMd0J8T\nH+h83T82DGFQaEqRDo/O/ax12Cl7nTbThkvkVfaNn2t6wIel+RVFgCcpe0x6PywY\nLHds1jqZLdrHwdbuBcwnMzwdpFnoAUe3h1OGwJKTvrLMrkV7Coet/JXfxzdG1RZ4\n4OXKsYJPoiVWtboW9lQZ2+1aYXNunLgDZq47XePpMZneT0VEuDPXMh+WsH7645PM\neLHYaiiigf3T/g458cUFHF55nsepAbizhGRAoz5JqTbBR1Y9XZZxYNJMehACX6QK\nmzYS+9O/LLynM4p4YdylNwwFMBF6JAhEW872eRN0PzjALq6q11Dokrmabac0TAac\nHk4r0zRhAgMBAAECggEAASEl2mfSYIt1r8OfQpNfEXFrSIL3SxO16KR3ALQwgnoH\n2gQc6lK10seziCVSJTtFHG7HxNoVNU6wAqSMkQzY6EF24TxqnKuziDnoehFowL3V\ntS5wkW8OrCLsrbWdZ48DabY0dsJYxoLE1YMacM1DnflEHTb7YHC2hTka+UA2Q16Y\nBE3K5Fyb81TV4yAxw2EpUGbuq2v/pTSruRr0G0jo4QcqW1VcxBbMK98vVnRyGKmI\nR/Ht2t414nJ7wWOtnl91czwZnQ9w/WOkQ0FER/DHypRWtyc9iji6ADEDjbGKx31D\nF6v34Sl3idjGUiJk/U6vUutjqiaSMjpo6xy9NNoIgQKBgQDl6S5tyATt4uTR7Kzv\n8dqs9svp+Cj59pgZfevrKUmuu1vJS1kL1SAQcCWVlTf1LLLwYs5Ph6uL5A7H+KlR\nPzEpgcJcQ+yac78FthNopkrigxMcM0M8cbzbRSUEhysqm7XVWA9ikboQ1wJyvfN4\nUhuvlMaEvSnKYDoXcxWDAV+tIQKBgQDTcSfpATMTiMJwDNWsAQeDJAteuCeC6ZJo\n7XGWi6cpXy2BP5AiUWdunIdVAurfYpHjTARnW2HWqNcWfxuH72MsU50VRCfMRi2X\ndiCXO1B04JDLBa3EOHZ6Y8vDTYXX3d6mjN6C4gkMLU5lHojJ77TahGDmUXlSeSA+\nsRQTtylfQQKBgQCJ1y/a6dzqsun1Yiyc/yfYI29GK16F3u55+iEDsJFYjUQOf3o3\nueOrd1FRSVFvUQlHTjXbQL/88xJZmiAJchWLiRx6LM8iGtsgFXW1fF3RSDyg36sk\nBhzwaZg0CsY6mXh/HHi85BnmFsKFAJWEQdYPgucylicECoVJodn33U77gQKBgA9b\ncKKjy6nnjPfGdt5/VKRZwdmnVndTr6afWFiu2/1NRGjWzQkxEGogRFQQWi7PYfk4\nVDmNkZWdvcGMidtdr75QdGBPCvTzQ+x0T/mr/TP/+4RDbVOLJk/NX8dXohkDrGA8\nawzmjfGseL0vco/4MRKN+tu/nyg2U/k5s1ObQg4BAoGAfjZihFEFSleWmHMa7hba\nDfft8tyUDmjJFUcrOU5dgVjVH/Tro62Gw36ekfptrDh2lk6BGT+fh7UmuLqEVw2v\nemyMCCCVlzMt9q2AqA7bIyGSxOWrW/gxiZCJbvliOM1IIUjqYUdxAYyU6ephh3Av\nCW6GtBSENi71cb+1BZZMbCg=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-e28au@dandelawebapp.iam.gserviceaccount.com",
    client_id: "107804844483445034104",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-e28au%40dandelawebapp.iam.gserviceaccount.com"
  };

  export default adminFirebaseConfig;