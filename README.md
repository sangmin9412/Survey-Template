# Survey-Template

```
const FIRST_SURVEY = new SURVEY({
      parentId: "survey_1", // 최상위 요소 id 값
      dataType: "data-input-type",  // input: 선택자 예) <input data-input-type="text" /> (text, checkbox, radio)
      step: 4, // 전체 스탭 수
      buttonClass: {
        prev: '.survey_1-prev', // 뒤로가기 class 값
        next: '.survey_1-next', // 앞으로가기 class 값
      }
    });
    
FIRST_SURVEY.init();
```
