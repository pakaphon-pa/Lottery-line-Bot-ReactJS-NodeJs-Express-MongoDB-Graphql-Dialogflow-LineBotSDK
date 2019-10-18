exports.Allmenu = {
    "type": "text", // 
    "quickReply": { 
      "items": [
        {
          "type": "action", // 
          "action": {
            "type": "message",
            "label": "บันทึกหวยของท่าน",
            "text": "บันทึกหวย"
          }
        },
         {
          "type": "action", // 
          "action": {
            "type": "message",
            "label": "เลขที่ท่านบันทึกในงวดนี้",
            "text": "ขอดูเลขที่บันทึกหน่อย"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "เช็ครางวัลที่คุณเคยถูก",
            "text": "รางวัลที่ฉันเคยถูก"
          }
        },
      ]
    }
  }

exports.insertNumber = {

  "type": "text", // 
  "quickReply": { 
    "items": [
      {
        "type": "action", // 
        "action": {
          "type": "message",
          "label": "บันทึกหวยของท่าน",
          "text": "บันทึกหวย"
        }
      }
    ]
  }
}

exports.confirm ={
    "type": "text", // 
    "quickReply": { 
      "items": [
        {
          "type": "action", // 
          "action": {
            "type": "message",
            "label": "ใช่",
            "text": "ใช่"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "ไม่ใช่",
            "text": "ไม่ใช่"
          }
        },
        {
          "type": "action", // 
          "action": {
            "type": "message",
            "label": "เริ่มต้นใหม่",
            "text": "เริ่มต้นใหม่"
          }
        }
      ]
    }
  }

exports.confirmInsert = {
    "type": "text", // 
    "quickReply": { 
      "items": [
        {
          "type": "action", // 
          "action": {
            "type": "message",
            "label": "บันทึก",
            "text": "บันทึก"
          }
        },
        {
          "type": "action", // 
          "action": {
            "type": "message",
            "label": "เริ่มต้นใหม่",
            "text": "เริ่มต้นใหม่"
          }
        }
      ]
    }
}

exports.Register = {
    "type": "text", // 
    "quickReply": { 
      "items": [
        {
          "type": "action", // 
          "action": {
            "type": "message",
            "label": "สมัครสมาชิก",
            "text": "สมัครสมาชิก"
          }
        }
      ]
    }
  }