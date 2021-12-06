NodeList.prototype.forEach = Array.prototype.forEach;

/*
const surveyRequest = () => {
  let result;
  try {
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/todos/1",
      async: false,
      dataType: "json",
      success: function (data) {
        result = data;
      }
    });
  } catch (err) {
    console.log(err);
  }
  return result;
};

console.log(surveyRequest());
*/

const getSruveyElements = (parentEl, dataType) => {
  const questionCardArea = parentEl.querySelector(`.survey-card-area`);
  const questionCard = parentEl.querySelectorAll(`.survey-card-area > .card`);
  const progressBar = parentEl.querySelector(`.progress-bar`);
  const input = {};

  questionCard.forEach((v, i) => {
    input[i] = {
      el: v.querySelectorAll(`[${dataType}]`),
    }
  });

  return {
    questionCardArea,
    questionCard,
    progressBar,
    input,
  }
}

const inputRegex = (val, type, length) => {
  switch (type) {
    case "text":
      if (val.trim() === "") return false;
      if (length) {
        return (val.length >= length);
      } else {
        return (val.length !== 0);
      }
    case "email":
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(val).toLowerCase());
    default:
      return undefined;
  }
}

const SURVEY = function (options) {
  this.parent = document.querySelector(`#${options.parentId}`);

  this.options = { // 초기옵션 설정
    parentId: "",
    dataType: "",
    step: null,
    currentStep: 1,
    completedStep: 1,
    completed: false,
    buttonClass: {},
    ...options
  }

  this.setProgress = () => { // 진행바 설정
    const { progressBar } = this.obj;
    const { step, currentStep } = this.options;

    progressBar.style.width = `${(currentStep / step) * 100}%`;
  }

  this.setQuestion = () => { // 문제 Class 및 문제 컨테이너 사이즈 설정
    const { questionCardArea, questionCard, input } = this.obj;
    const { step, currentStep } = this.options;
    const _currentStep = currentStep - 1;
    const _prevStep = currentStep > 1 ? currentStep - 2 : false;
    const _nextStep = currentStep < step ? currentStep : false;
    let _height;

    if (this.options.step !== questionCard.length) return;

    questionCard.forEach((v, i) => {
      // 클래스 초기화
      v.classList.remove("current");
      v.classList.remove("prev");
      v.classList.remove("next");

      input[i].el.forEach(v => {
        if (v.dataset.inputType !== "submit") {
          v.dataset.cardId = i;
        }
      });
    });


    questionCard[_currentStep].classList.add("current");
    if (_prevStep !== false) {
      questionCard[_prevStep].classList.add("prev");
    }
    if (_nextStep !== false) {
      questionCard[_nextStep].classList.add("next");
    }

    _height = questionCard[_currentStep].offsetHeight;
    questionCardArea.style.minHeight = `${_height}px`;

    // STEP 리사이즈 이벤트
    // create an Observer instance
    const resizeObserver = new ResizeObserver(entries => {
      questionCardArea.style.minHeight = `${entries[0].target.clientHeight}px`;
    });

    // start observing a DOM node
    resizeObserver.observe(questionCard[_currentStep])
  }

  this.functions = {
    InputHandler: (target) => {
      const value = target.value;
      const dataTypeVal = target.dataset.inputType;
      const maxLength = target.dataset.inputMaxlength;
      let result;
      if (inputRegex(value, dataTypeVal, maxLength)) {
        target.classList.add("is-valid");
        target.classList.remove("is-invalid");
        result = true;
      } else {
        target.classList.add("is-invalid");
        target.classList.remove("is-valid");
        result = false;
      }
      return result;
    },
    InputCheck: (idx) => {
      const { input } = this.obj;
      const { InputHandler, CheckboxHandler } = this.functions;
      const validArr = [];
      const $input = Array.from(input[idx].el).filter(v => {
        return v.dataset.inputType === "text" || v.dataset.inputType === "email" ? v : null;
      });

      const $checkbox = Array.from(input[idx].el).filter(v => {
        return v.dataset.inputType === "checkbox" || v.dataset.inputType === "radio" ? v : null;
      });

      for (let i = 0; i < $input.length; i++) {
        InputHandler($input[i]) ? validArr.push(true) : validArr.push(false);
      }

      for (let i = 0; i < $checkbox.length; i++) {
        CheckboxHandler($checkbox[i]) ? validArr.push(true) : validArr.push(false);
      }

      for (let i = 0; i < validArr.length; i++) {
        if (!validArr[i]) return false;
      }

      return true;
    },
    CheckboxHandler: (target) => {
      const cardId = target.dataset.cardId;
      const inputId = target.dataset.inputId;
      const $checkbox = this.parent.querySelectorAll(`[data-card-id="${cardId}"][data-input-id="${inputId}"]`);
      let result;

      for (let i = 0; i < $checkbox.length; i++) {
        if ($checkbox[i].checked) {
          result = true;
          break;
        }
        result = false;
      }

      if (result) {
        $checkbox.forEach(v => {
          v.classList.remove("is-invalid");
        });
      } else {
        $checkbox.forEach(v => {
          v.classList.add("is-invalid");
        });
      }

      return result;
    },
    SurveyCompleted: () => {
      const { input } = this.obj;
      const answers = {};
      for (const key in input) {
        const $input = Array.from(input[key].el).filter(v => {
          return v.dataset.inputType === "text" || v.dataset.inputType === "email" ? v : null;
        });

        const $checkbox = Array.from(input[key].el).filter(v => {
          return v.dataset.inputType === "checkbox" || v.dataset.inputType === "radio" ? v : null;
        });

        const inputArr = $input.map(v => {
          const type = v.dataset.inputType;
          const id = v.dataset.inputId;
          const question = v.dataset.inputQuestion;
          const value = v.value;

          const result = {
            cardId: key,
            id,
            question,
            value,
            type,
          }

          return result;
        });

        const checkboxArr = $checkbox.map(v => {
          const checked = v.checked;
          const type = v.dataset.inputType;
          const id = v.dataset.inputId;
          const question = v.dataset.inputQuestion;
          const value = v.value;

          const result = {
            cardId: key,
            id,
            question,
            value,
            type,
            checked
          }

          return result;
        });

        const checkboxRealArr = [];
        checkboxArr.filter(v => v.type === "checkbox" || v.type === "radio").forEach(v => {
          let condition = true;
          for (let i = 0; i < checkboxRealArr.length; i++) {
            if (checkboxRealArr[i].id === v.id) {
              condition = false;
              break;
            };
          }
          const copy = { ...v };
          copy.value = [];
          delete copy.checked;
          condition ? checkboxRealArr.push(copy) : null;
        });

        checkboxArr.filter(v => v.checked).forEach(v => {
          for (let i = 0; i < checkboxRealArr.length; i++) {
            if (checkboxRealArr[i].id === v.id) {
              checkboxRealArr[i].value.push(v.value);
            }
          }
        });

        answers[key] = [...inputArr, ...checkboxRealArr];

        answers[key].sort((a, b) => {
          return parseInt(a.id, 10) - parseInt(b.id, 10);
        });
      }

      // 출력
      console.log(answers);
      let alertTxt = "";
      for (const key in answers) {
        if (Object.hasOwnProperty.call(answers, key)) {
          alertTxt += `${Number(key) + 1}번 STEP 결과 \n`;
          answers[key].forEach(v => {
            alertTxt += `${v.id}. ${v.question} - ${v.value} \n`;
          });
          alertTxt += `-------------------------------\n`;
        }
      }
      alert(alertTxt);
    }
  }

  this.bind = {
    input: () => {
      const _this = this;
      const { input } = this.obj;
      const { InputHandler, InputCheck, CheckboxHandler, SurveyCompleted } = this.functions;

      for (const key in input) {
        input[key].el.forEach(v => {
          const inputType = v.dataset.inputType;

          switch (inputType) {
            case "text":
            case "email":
              v.addEventListener("input", function (e) {
                InputHandler(e.target);
              });
              break;
            case "checkbox":
            case "radio":
              v.addEventListener("change", function (e) {
                CheckboxHandler(e.target);
              });
              break;
            case "select":
              break;
            case "submit":
              v.addEventListener("click", function () {
                const { step, currentStep } = _this.options;
                const _currentStep = currentStep - 1;

                if (InputCheck(_currentStep)) {
                  if (currentStep < step) {
                    if (_this.options.currentStep === _this.options.completedStep) _this.options.completedStep++;
                    _this.options.currentStep++;
                    _this.setProgress();
                    _this.setQuestion();
                  }

                  if (currentStep === step) {
                    SurveyCompleted();
                    _this.options.completed = true;
                  }
                }

                return false;
              });
              break;
            default:
              break;
          }
        });
      }
    },
    buttons: () => {
      const _this = this;
      const { InputCheck } = this.functions;
      const { prev, next } = this.options.buttonClass;
      const $prev = document.querySelector(prev);
      const $next = document.querySelector(next);

      $prev.addEventListener("click", function () {
        const { currentStep } = _this.options;
        if (currentStep === 1) {
          alert('처음 STEP입니다.');
          return
        };
        _this.options.currentStep--;
        _this.setProgress();
        _this.setQuestion();
        return false;
      });

      $next.addEventListener("click", function () {
        const { completed, currentStep, completedStep } = _this.options;
        const _currentStep = currentStep - 1;
        if ((currentStep === completedStep) && !completed) {
          let alertTxt = InputCheck(_currentStep) ? `STEP 하단 버튼을 눌러주세요.` : `STESP.0${completedStep}번 설문을 진행해주세요.`
          alert(alertTxt);
          return;
        }
        if ((currentStep === completedStep) && completed) {
          alert(`설문이 완료되었습니다.`);
          return;
        }
        if (InputCheck(_currentStep)) {
          _this.options.currentStep++;
          _this.setProgress();
          _this.setQuestion();
        }
        return false;
      });
    },
  }

  this.init = () => {
    this.obj = getSruveyElements(this.parent, options.dataType);
    this.setProgress();
    this.setQuestion();
    this.bind.input();
    this.bind.buttons();
  }
}

SURVEY.prototype.setStepHtml = function (obj) {
  return obj.reduce((html, v) => {
    return html += `
      <div class="card">
        <div class="card-header bg-gray-dark ">
          <h5 class="card-title text-white mt-2">STEP.0${v.id}</h5>
        </div>
        <div class="modal-body">
          <div class="text-center">
            <p>
              <strong>${v.title}</strong>
            </p>
            <p>
              <strong>${v.desc}</strong>
            </p>
          </div>

          <hr />

          <div class="px-4">
            ${this.setQuestionHtmlFunc(v)}
          </div>
        </div>
        <div class="card-footer text-end">
          <div class="d-grid">
            <button type="button" class="btn btn-dark" data-input-type="submit">다음</button>
          </div>
        </div>
      </div>
    `;
  }, "");
}

SURVEY.prototype.setQuestionHtmlFunc = function (obj) {
  let num = 1;
  return obj.questions.reduce((html, input) => {
    if (input.dataAttr?.type === "text" || input.dataAttr?.type === "email") {
      return html += `
        <div class="form-group mb-3">
          <label class="form-label" for="custom-validation-input-${obj.id + input.id}">${input.question}</label>
          ${input.tag === "textarea"
          ? `<textarea 
              type="${input.type}" 
              id="custom-validation-input-${obj.id + input.id}" 
              class="form-control" 
              ${input.readonly ? 'readonly' : ''}
              ${input.disabled ? 'disabled' : ''}
              ${input.dataAttr.maxLength ? `data-input-maxlength="${input.dataAttr.maxLength}"` : ''}
              data-input-type="${input.dataAttr.type}" 
              data-input-id="${input.id}" 
              data-input-question="${input.question}"
              value="${input.value}"></textarea>`
          : `<input 
              type="${input.type}" 
              id="custom-validation-input-${obj.id + input.id}" 
              class="form-control" 
              ${input.readonly ? 'readonly' : ''}
              ${input.disabled ? 'disabled' : ''}
              ${input.dataAttr.maxLength ? `data-input-maxlength="${input.dataAttr.maxLength}"` : ''}
              data-input-type="${input.dataAttr.type}" 
              data-input-id="${input.id}" 
              data-input-question="${input.question}"
              value="${input.value}">`
        }
        </div>
      `
    }
    if (input.type === "radio" || input.type === "checkbox") {
      return html += `<div class="form-group mb-3">
        <label class="form-label" for="custom-validation-input-${obj.id + input.id}">${input.question}</label>
        ${input[input.type].reduce((html, check) => {
        num++
        return html += `
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="${input.type}"
                  name="flexRadioDefault${input.id}"
                  value="${check.value}"
                  id="flexRadioDefault${obj.id + input.id + num}"
                  data-input-type="${input.type}" 
                  data-input-id="${input.id}" 
                  data-input-question="${input.question}"
                />
                <label class="form-check-label" for="flexRadioDefault${obj.id + input.id + num}">${check.label}</label>
              </div>
            `
      }, "")}
      </div>
      `
    }
  }, "");
}

SURVEY.prototype.setStep = function (data) {
  const questionCardArea = this.parent.querySelector(".survey-card-area");
  const { step } = data;

  this.options.step = step.length;

  const html = this.setStepHtml(step);

  questionCardArea.innerHTML = html;
};