const surveyData = {
  step: [
    {
      id: "1",
      title: "Title",
      desc: "Description",
      questions: [
        {
          id: "1",
          question: "사번",
          type: "text",
          readonly: true,
          disabled: false,
          value: "TH201213",
          placeholder: "",
          dataAttr: {
            type: "text",
            maxLength: "",
          }
        },
        {
          id: "2",
          question: "소속",
          type: "text",
          readonly: true,
          disabled: false,
          value: "더에스엠씨그룹",
          placeholder: "",
          dataAttr: {
            type: "text",
            maxLength: "",
          }
        },
        {
          id: "3",
          question: "부서 / 팀",
          type: "text",
          readonly: true,
          disabled: false,
          value: "R&D",
          placeholder: "",
          dataAttr: {
            type: "text",
            maxLength: "",
          }
        },
        {
          id: "4",
          question: "설문 테스트 4 (라디오)",
          type: "radio",
          radio: [
            {
              readonly: false,
              disabled: false,
              value: "라디오박스 테스트 1",
              label: "라디오박스 테스트 1",
            },
            {
              readonly: false,
              disabled: false,
              value: "라디오박스 테스트 2",
              label: "라디오박스 테스트 2",
            },
          ]
        },
      ]
    },
    {
      id: "2",
      title: "Title",
      desc: "Description",
      questions: [
        {
          id: "1",
          question: "설문 테스트 1 (체크박스)",
          type: "checkbox",
          checkbox: [
            {
              readonly: false,
              disabled: false,
              value: "체크박스 테스트 1",
              label: "체크박스 테스트 1",
            },
            {
              readonly: false,
              disabled: false,
              value: "체크박스 테스트 2",
              label: "체크박스 테스트 2",
            },
          ]
        },
        {
          id: "2",
          question: "설문 테스트 2 (이메일)",
          type: "text",
          readonly: false,
          disabled: false,
          value: "",
          placeholder: "email",
          dataAttr: {
            type: "email",
            maxLength: "",
          }
        },
        {
          id: "3",
          question: "설문 테스트 3 (10자 이상)",
          type: "text",
          tag: "textarea",
          readonly: false,
          disabled: false,
          value: "",
          placeholder: "10자 이상 입력",
          dataAttr: {
            type: "text",
            maxLength: "10",
          }
        },
        {
          id: "4",
          question: "설문 테스트 4 (30자 이상)",
          type: "text",
          tag: "textarea",
          readonly: false,
          disabled: false,
          value: "",
          placeholder: "30자 이상 입력",
          dataAttr: {
            type: "text",
            maxLength: "30",
          }
        },
        {
          id: "5",
          question: "설문 테스트 5 (체크박스)",
          type: "checkbox",
          checkbox: [
            {
              readonly: false,
              disabled: false,
              value: "체크박스 테스트 3",
              label: "체크박스 테스트 3",
            },
            {
              readonly: false,
              disabled: false,
              value: "체크박스 테스트 4",
              label: "체크박스 테스트 4",
            },
          ]
        },
      ]
    },
    {
      id: "3",
      title: "Title",
      desc: "Description",
      questions: [
        {
          id: "1",
          question: "설문 테스트 1",
          type: "text",
          readonly: false,
          disabled: false,
          value: "",
          placeholder: "",
          dataAttr: {
            type: "text",
            maxLength: "",
          }
        },
        {
          id: "2",
          question: "설문 테스트 2",
          type: "text",
          readonly: false,
          disabled: false,
          value: "",
          placeholder: "",
          dataAttr: {
            type: "text",
            maxLength: "",
          }
        },
        {
          id: "3",
          question: "설문 테스트 3",
          type: "text",
          readonly: false,
          disabled: false,
          value: "",
          placeholder: "",
          dataAttr: {
            type: "text",
            maxLength: "",
          }
        },
      ]
    },
    {
      id: "4",
      title: "Title",
      desc: "Description",
      questions: [
        {
          id: "1",
          question: "설문 테스트 1",
          type: "text",
          readonly: false,
          disabled: false,
          value: "",
          placeholder: "",
          dataAttr: {
            type: "text",
            maxLength: "",
          }
        },
        {
          id: "2",
          question: "설문 테스트 2",
          type: "text",
          readonly: false,
          disabled: false,
          value: "",
          placeholder: "",
          dataAttr: {
            type: "text",
            maxLength: "",
          }
        },
        {
          id: "3",
          question: "설문 테스트 3",
          type: "text",
          readonly: false,
          disabled: false,
          value: "",
          placeholder: "",
          dataAttr: {
            type: "text",
            maxLength: "",
          }
        },
      ]
    },
  ]
}