import template from './md-form-textarea.html';

const mdFormTextareaController = class MdFormTextareaController {
    constructor() {
        // 'ngInject';
        // console.log('constructor: mdFormTextareaController controller');
    }

    $onInit() {
        // console.log('Init mdFormTextareaController');
        // Initi this.edit according "this.field.editable" value
        if (!this.edit || this.field.editable == 'false') {
            this.edit = false;
        }
        // Init default value
        // console.log(this.fieldValue, this.field.value);
        this.fieldValue = this.fieldValue || this.field.value;
    }

    $onChanges(changes) {
        // console.log(7777777, changes);
        // this.fieldValue = this.changeValue(this.fieldValue, 'EMPTY', '');
        // this.saveData();
        if (changes.fieldValue) {
            // this.fieldValue = this.changeValue(this.fieldValue, 'EMPTY', '');
            // console.log(changes.fieldValue.currentValue, this.fieldValue);
            this.fieldValue = (changes.fieldValue.currentValue == 'EMPTY') ? '' : changes.fieldValue.currentValue;
            if (!changes.fieldValue.isFirstChange()) {
                this.saveData();
            }
        }
    }

    // changeValue(fieldValue, oldValue, newValue) {
    //     if (fieldValue == oldValue) {
    //         return newValue;
    //     }
    //     return fieldValue;
    // }

    saveData() {
        // console.log('AAAAAAAAA', this.fieldValue, this.tpl);
        this.update({
            space: this.space,
            field: this.field.name,
            fieldValue: this.fieldValue
        });
    }

    onBlur() {
        this.changeEdit();
        this.saveData();
    }

    isValidField() {
        if (this.field.mandatory && !this.fieldValue) {
            return false;
        }
        return true;
    }
    isEmptyField() {
        return (!this.fieldValue);
    }

    changeEdit() {
        if (this.field.editable == 'both') {
            this.edit = !(this.edit);
        } else if (this.field.editable == 'false') {
            this.edit = false;
        } else {
            this.edit = true;
        }
    }
}

export const mdFormTextareaComponent = {
    bindings: {
        tpl: '@',
        space: '@',
        fieldValue: '<',
        field: '<',
        edit: '<',
        update: '&'
    },
    template: template,
    controller: mdFormTextareaController,
};