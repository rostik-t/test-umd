(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@emias-kpi/ui-kit'), require('@angular/animations'), require('@angular/forms'), require('@ehr-forms/renderer-angular'), require('rxjs/operators'), require('@angular/common/http'), require('@angular/core'), require('rxjs'), require('@ehr-forms/open-ehr-library'), require('@ehr-forms/renderer')) :
    typeof define === 'function' && define.amd ? define('@ehr-forms/navigation-library-angular', ['exports', '@angular/common', '@emias-kpi/ui-kit', '@angular/animations', '@angular/forms', '@ehr-forms/renderer-angular', 'rxjs/operators', '@angular/common/http', '@angular/core', 'rxjs', '@ehr-forms/open-ehr-library', '@ehr-forms/renderer'], factory) :
    (factory((global['ehr-forms'] = global['ehr-forms'] || {}, global['ehr-forms']['navigation-library-angular'] = {}),global.ng.common,global.uiKit,global.ng.animations,global.ng.forms,global.rendererAngular,global.rxjs.operators,global.ng.common.http,global.ng.core,global.rxjs,global.openEhrLibrary,global.renderer));
}(this, (function (exports,common,uiKit,animations,forms,rendererAngular,operators,http,core,rxjs,openEhrLibrary,renderer) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    var Messenger = /** @class */ (function (_super) {
        __extends(Messenger, _super);
        function Messenger(context) {
            var _this = _super.call(this, context, renderer.ElementType.Container) || this;
            _this.archetypes = {};
            return _this;
        }
        Messenger.prototype.getTitle = function () {
            return "Мессенджер";
        };
        Messenger.prototype.init = function () {
            if (!this.slots) {
                this.slots = [];
            }
        };
        // загрузка данных в слоты
        Messenger.prototype.load = function (dataContext) {
            var _this = this;
            _super.prototype.load.call(this, dataContext);
            if (!this.dataContext)
                return;
            this.archetypes = {};
            var archetypeNodes = this.dataContext.getArchetypeTree();
            archetypeNodes.forEach(function (tree) { return _this.loadArchetypeRecursive(tree.getTree()); });
            this.slots.forEach(function (c) { return c.load(dataContext); });
        };
        // список всех слотов
        Messenger.prototype.getSlots = function () {
            return this.slots;
        };
        Messenger.prototype.getRuntimeChildren = function () {
            return this.slots;
        };
        Messenger.prototype.getChildren = function () {
            return [];
        };
        Messenger.prototype.getActions = function () {
            var actions = [];
            _super.prototype.getActions.call(this).forEach(function (c) {
                actions.push(c);
            });
            return actions;
        };
        Messenger.prototype.addMessage = function (message) {
            var archetypeNodes = this.getArchetypesForMessage(message);
            if (archetypeNodes.length === 0)
                return;
            var archetypeNode = archetypeNodes[0];
            this.addArchetype(archetypeNode);
        };
        Messenger.prototype.getArchetypesForMessage = function (message) {
            var _this = this;
            return Object.keys(this.archetypes).filter(function (c) { return c.startsWith(message); }).map(function (c) { return _this.archetypes[c]; });
        };
        Messenger.prototype.addArchetype = function (archetypeNode) {
            var components = renderer.ElementFactory.getInstance().createComponents(archetypeNode);
            if (components.length === 0)
                return;
            var widgetRef = components.find(function (c) { return c.elementType === renderer.ElementType.WidgetRef; });
            if (!widgetRef)
                return;
            var slotElement = renderer.ElementNode.create({
                type: renderer.BasicSlot.className,
                library: this.node.getLibrary(),
                version: this.node.getVersion(),
            });
            var slot = new renderer.BasicSlot(this.childContext(slotElement));
            slot.putComponent(widgetRef);
            this.slots.push(slot);
            if (this.dataContext) {
                slot.load(this.dataContext);
            }
            this.raiseChanged(this, undefined);
            this.onUpdated().trigger({ component: this });
        };
        Messenger.prototype.loadArchetypeRecursive = function (archetypeNode) {
            var _this = this;
            if (!archetypeNode)
                return;
            if (archetypeNode.type === renderer.ArchetypeNodeType.Archetype) {
                this.archetypes[archetypeNode.name] = archetypeNode;
            }
            if (archetypeNode.childNodes) {
                archetypeNode.childNodes.forEach(function (c) { return _this.loadArchetypeRecursive(c); });
            }
        };
        Messenger.className = 'Messenger';
        return Messenger;
    }(renderer.BindableComponent));
    var MessengerComponent = /** @class */ (function (_super) {
        __extends(MessengerComponent, _super);
        function MessengerComponent(changeDetectorRef) {
            return _super.call(this, changeDetectorRef) || this;
        }
        Object.defineProperty(MessengerComponent.prototype, "slots", {
            get: function () {
                return this.model.getSlots();
            },
            enumerable: true,
            configurable: true
        });
        MessengerComponent.prototype.getModel = function () {
            return this.model;
        };
        MessengerComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
        };
        MessengerComponent.prototype.setMessage = function (message) {
            this.message = message;
            this.archetypes = this.model.getArchetypesForMessage(message);
        };
        MessengerComponent.prototype.addArchetype = function (node) {
            this.model.addArchetype(node);
        };
        MessengerComponent.prototype.add = function () {
            this.model.addMessage(this.message);
        };
        MessengerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ehr-messenger',
                        template: "<div class=\"error\" *ngIf=\"hasError\"></div>\r\n<div class=\"container\">\r\n    <ehr-root-slot *ngFor=\"let slot of slots\"\r\n                   [model]=\"slot\"\r\n                   [reload]=\"reloadId\"\r\n                   [component]=\"slot.getComponent()\"></ehr-root-slot>\r\n\r\n    <textarea [rows]=\"5\" class=\"textarea\" (input)=\"setMessage($event.target.value)\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\"></textarea>\r\n    <span (click)=\"addArchetype(archetype)\" style=\"background-color: #ffa21d\" *ngFor=\"let archetype of archetypes\">{{ archetype.name }}</span>\r\n    <span (click)=\"add()\">\u0412\u0432\u0435\u0441\u0442\u0438</span>\r\n</div>\r\n\r\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".container{display:flex;flex-wrap:nowrap;justify-content:flex-start;align-content:stretch;align-items:stretch;flex-direction:column}"]
                    }] }
        ];
        /** @nocollapse */
        MessengerComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef }
            ];
        };
        MessengerComponent.propDecorators = {
            model: [{ type: core.Input }]
        };
        MessengerComponent = __decorate([
            rendererAngular.AssignModel(Messenger),
            __metadata("design:paramtypes", [core.ChangeDetectorRef])
        ], MessengerComponent);
        return MessengerComponent;
    }(rendererAngular.BasicComponent));

    var NavigationSection = /** @class */ (function (_super) {
        __extends(NavigationSection, _super);
        function NavigationSection(context) {
            var _this = _super.call(this, context) || this;
            _this.context = context;
            _this.title = _this.property({
                key: 'title',
                title: 'Заголовок',
                type: renderer.EditorType.Text,
                metadata: {
                    name: 'Заголовок',
                    type: openEhrLibrary.PropertyType.STRING
                }
            });
            _this.hiddenByDefault = _this.property({
                key: 'hiddenByDefault',
                title: 'Отображать в свернутом виде',
                type: renderer.EditorType.Boolean,
                defaultValue: true,
                metadata: {
                    name: 'Отображать в свернутом виде',
                    type: openEhrLibrary.PropertyType.BOOLEAN
                }
            });
            // путь относительно архетипа
            _this.bindingPath = _this.property({
                key: 'path',
                title: 'Путь относительно родительского архетипа',
                type: renderer.EditorType.BindingPath,
                metadata: {
                    name: 'Путь относительно родительского архетипа',
                    type: openEhrLibrary.PropertyType.STRING
                }
            });
            return _this;
        }
        Object.defineProperty(NavigationSection.prototype, "hasHideableSections", {
            get: function () {
                return this._hasHideableSections;
            },
            set: function (value) {
                this._hasHideableSections = value;
            },
            enumerable: true,
            configurable: true
        });
        NavigationSection.prototype.init = function () {
            _super.prototype.init.call(this);
            if (!this.slots.length) {
                this.add();
            }
        };
        NavigationSection.prototype.createElement = function () {
            return renderer.ElementNode.create({ type: renderer.BasicSlot.className, library: this.node.getLibrary(), version: this.node.getVersion() });
        };
        NavigationSection.prototype.createSlot = function (context) {
            return new renderer.BasicSlot(context);
        };
        NavigationSection.prototype.getTitle = function () {
            return 'Секция для навигации';
        };
        NavigationSection.prototype.getDescription = function () {
            return this.title.getValue() ? this.title.getValue() : _super.prototype.getDescription.call(this);
        };
        NavigationSection.prototype.isNodeActive = function (section) {
            return (section === this);
        };
        NavigationSection.prototype.load = function (dataContext) {
            var _this = this;
            this.dataContext = dataContext;
            this.loadBindings();
            if (!this.dataContext)
                return;
            if (!this.bindingPath.getValue() || this.bindingPath.getValue() === '') {
                this.slotDataContext = dataContext;
            }
            else {
                this.bindingPath.setValue(this.dataContext.shrinkPath(this.bindingPath.getValue()));
                this.slotDataContext = this.createDataContext(this.bindingPath.getValue());
            }
            if (this.slots) {
                this.slots.forEach(function (slot) { return slot.load(_this.slotDataContext); });
            }
        };
        NavigationSection.prototype.hasError = function () {
            return this.pathError !== undefined;
        };
        NavigationSection.prototype.getMessages = function () {
            var messages = _super.prototype.getMessages.call(this);
            if (this.pathError !== undefined) {
                messages.push(this.pathError);
            }
            return messages;
        };
        NavigationSection.prototype.close = function () {
            this.slotDataContext.delete();
            // todo;
        };
        NavigationSection.prototype.setSetting = function (name, value) {
            var previousBindingPath = this.bindingPath.getValue();
            var reload = false;
            if (name === this.bindingPath.code) {
                var path = value;
                if (path !== previousBindingPath) {
                    this.slotDataContext = this.createDataContext(path);
                    reload = true;
                }
            }
            _super.prototype.setSetting.call(this, name, value);
            if (reload) {
                this.load(this.dataContext);
                this.onUpdated().trigger({ component: this });
            }
        };
        NavigationSection.prototype.buildEditor = function (builder) {
            _super.prototype.buildEditor.call(this, builder);
            builder
                .property(this.title.getSetting())
                .property(this.hiddenByDefault.getSetting())
                .property(this.bindingPath.getSetting());
        };
        // aql path
        NavigationSection.prototype.createDataContext = function (path) {
            var bindingPath = this.dataContext.shrinkPath(path); // aql path
            try {
                var dataContext = bindingPath === '' ? this.dataContext :
                    this.dataContext.getChildContext(bindingPath);
                return dataContext;
            }
            catch (e) {
                return undefined;
            }
        };
        NavigationSection.className = 'NavigationSection';
        return NavigationSection;
    }(renderer.BaseSlotContainer));

    var NavigationHideableSection = /** @class */ (function (_super) {
        __extends(NavigationHideableSection, _super);
        function NavigationHideableSection(context) {
            var _this = _super.call(this, context) || this;
            // todo: убрать эту переменную
            _this.hiddenByDefault = _this.property({
                key: 'hiddenByDefault',
                title: 'Скрывать в навигации',
                type: renderer.EditorType.Boolean,
                defaultValue: false,
                metadata: {
                    name: 'Скрывать в навигации',
                    type: openEhrLibrary.PropertyType.BOOLEAN
                }
            });
            return _this;
        }
        Object.defineProperty(NavigationHideableSection.prototype, "isHidden", {
            get: function () {
                return this._hidden;
            },
            set: function (value) {
                this._hidden = value;
                this.onValueUpdated().trigger();
                this.raiseChanged(this, undefined);
            },
            enumerable: true,
            configurable: true
        });
        NavigationHideableSection.prototype.toggleHiddenState = function () {
            this.isHidden = !this.isHidden;
        };
        NavigationHideableSection.prototype.getTitle = function () {
            return 'Скрываемая секция для навигации';
        };
        NavigationHideableSection.prototype.getDescription = function () {
            return this.title.getValue() ? this.title.getValue() : _super.prototype.getDescription.call(this);
        };
        NavigationHideableSection.prototype.buildEditor = function (builder) {
            _super.prototype.buildEditor.call(this, builder);
        };
        NavigationHideableSection.className = 'NavigationHideableSection';
        return NavigationHideableSection;
    }(NavigationSection));

    var NavigationSectionComponent = /** @class */ (function (_super) {
        __extends(NavigationSectionComponent, _super);
        function NavigationSectionComponent(changeDetectorRef) {
            var _this = _super.call(this, changeDetectorRef) || this;
            _this.isCollapsed = false;
            _this.activeNode = false;
            return _this;
        }
        NavigationSectionComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            if (this.model.hiddenByDefault.getValue() === true) {
                this.collapseSection();
            }
            this.viewSettings = this.model.findParent('Navigation').getViewSettings();
            this.viewSettings.activeNodeChangedEvent.on(this.onActiveNodeChanged.bind(this));
        };
        NavigationSectionComponent.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
            this.viewSettings.activeNodeChangedEvent.off(this.onActiveNodeChanged.bind(this));
        };
        NavigationSectionComponent.prototype.toggleAddSection = function () {
            this.viewSettings.toggleSectionHiddenContents(this.model);
        };
        NavigationSectionComponent.prototype.getModel = function () {
            return this.model;
        };
        NavigationSectionComponent.prototype.expandSection = function ($event) {
            this.isCollapsed = false;
        };
        NavigationSectionComponent.prototype.collapseSection = function ($event) {
            this.isCollapsed = true;
            $event && $event.stopPropagation();
        };
        NavigationSectionComponent.prototype.onActiveNodeChanged = function (activeNode) {
            var newActiveNode = this.model.isNodeActive(activeNode.section);
            if (this.activeNode !== newActiveNode) {
                this.activeNode = newActiveNode;
                this.changeDetectorRef.detectChanges();
            }
        };
        NavigationSectionComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ehr-navigation-section',
                        template: "<div class=\"navigation-section\" id=\"id-{{model.getId()}}\" [ngClass]=\"{ 'is-collapsed': isCollapsed, 'active': activeNode }\">\r\n    <div class=\"header\" (click)=\"expandSection($event)\">\r\n        <div class=\"corner\"></div>\r\n        <span class=\"label\">\r\n            <span class=\"label-text\">\r\n                <span class=\"plus\">\r\n                    <sc-svg-icon type=\"plus\" size=\"s\"></sc-svg-icon>\r\n                </span>\r\n               {{ model.getDescription() }}\r\n            </span>\r\n        </span>\r\n        <span class=\"label-end-position-holder\">\r\n            <span class=\"clear\" (click)=\"collapseSection($event)\">\r\n                <sc-svg-icon type=\"close\" size=\"s\"></sc-svg-icon>\r\n            </span>\r\n        </span>\r\n    </div>\r\n    <div class=\"content\">\r\n        <div class=\"slot-container\" *ngFor=\"let slot of model.getSlots()\">\r\n            <ehr-root-slot class=\"slot\"\r\n                           [reload]=\"reloadId\"\r\n                           [component]=\"slot.getComponent()\"\r\n                           [model]=\"slot\"></ehr-root-slot>\r\n        </div>\r\n        <div class=\"navigation-section__add-button\" *ngIf=\"model.hasHideableSections\" (click)=\"toggleAddSection()\">\r\n            <sc-svg-icon type=\"plus\" size=\"s\"></sc-svg-icon> <span class=\"navigation-section__add-button_text\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0440\u0430\u0437\u0434\u0435\u043B</span>\r\n        </div>\r\n    </div>\r\n</div>\r\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [":host .navigation-section{background-color:#fff;border:1px dashed #ccc;border-radius:4px;display:flex;flex-direction:column}:host .navigation-section.active{border:1px dashed #ffe066}:host .navigation-section.active .header .corner:before{content:''}:host .navigation-section.is-collapsed .header{cursor:pointer}:host .navigation-section.is-collapsed .header .label-text{color:#269999}:host .navigation-section.is-collapsed .header .plus{display:block;height:16px;margin-right:12px;width:16px;font-size:12px}:host .navigation-section.is-collapsed .header .clear{display:none}:host .navigation-section.is-collapsed .header:hover{background-color:#eaf5f5}:host .navigation-section.is-collapsed .content{display:none}:host .navigation-section__add-button{align-items:center;border:1px dashed #269999;color:#269999;cursor:pointer;display:flex;flex-shrink:0;font-weight:600;height:72px;justify-content:center;margin:16px}:host .navigation-section__add-button:hover{background-color:#eaf5f5}:host .navigation-section__add-button>sc-svg-icon{display:block;height:16px;margin-right:8px;width:16px}:host .navigation-section__add-button_text{border-bottom:1px dashed #269999;line-height:24px;font-size:15px}:host .navigation-section ::ng-deep .navigation-hideable-section,:host .navigation-section ::ng-deep .navigation-section{background-color:#fafafa}:host .navigation-section ::ng-deep .navigation-hideable-section .navigation-hideable-section,:host .navigation-section ::ng-deep .navigation-hideable-section .navigation-section,:host .navigation-section ::ng-deep .navigation-section .navigation-hideable-section,:host .navigation-section ::ng-deep .navigation-section .navigation-section{background-color:#fff}:host .navigation-section ::ng-deep .navigation-hideable-section .navigation-hideable-section .navigation-hideable-section,:host .navigation-section ::ng-deep .navigation-hideable-section .navigation-hideable-section .navigation-section,:host .navigation-section ::ng-deep .navigation-hideable-section .navigation-section .navigation-hideable-section,:host .navigation-section ::ng-deep .navigation-hideable-section .navigation-section .navigation-section,:host .navigation-section ::ng-deep .navigation-section .navigation-hideable-section .navigation-hideable-section,:host .navigation-section ::ng-deep .navigation-section .navigation-hideable-section .navigation-section,:host .navigation-section ::ng-deep .navigation-section .navigation-section .navigation-hideable-section,:host .navigation-section ::ng-deep .navigation-section .navigation-section .navigation-section{background-color:#fafafa}:host .header{align-items:center;background-color:transparent;border-bottom:0;display:flex;padding:16px}:host .header .corner{border-radius:4px 0 0;display:block;position:absolute;overflow:hidden;top:0;left:0;height:24px;width:24px}:host .header .corner:before{border:24px solid transparent;border-left:24px solid #ffe066;display:block;height:0;left:0;position:absolute;top:-24px;width:0}:host .content{display:flex;flex-direction:column;margin:0 16px}:host .content .slot-container{margin-bottom:16px}:host .label-container{align-items:center;display:flex;margin-right:16px;position:relative;z-index:5}:host .label-end-position-holder{margin-left:auto}:host .clear{border-bottom:0;cursor:pointer;display:block;opacity:.5;color:#269999}:host .clear:hover{opacity:1}:host .clear sc-svg-icon{display:block}:host .plus{display:none}:host .plus sc-svg-icon{display:block}:host .label{align-items:center;display:flex;margin-right:16px;position:relative;z-index:5}:host .label-text{align-items:center;display:flex;color:#000;font-size:18px;font-weight:600;line-height:24px}"]
                    }] }
        ];
        /** @nocollapse */
        NavigationSectionComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef }
            ];
        };
        NavigationSectionComponent.propDecorators = {
            model: [{ type: core.Input }],
            isCollapsed: [{ type: core.Input }]
        };
        NavigationSectionComponent = __decorate([
            rendererAngular.AssignModel(NavigationSection),
            __metadata("design:paramtypes", [core.ChangeDetectorRef])
        ], NavigationSectionComponent);
        return NavigationSectionComponent;
    }(rendererAngular.BasicComponent));

    var NavigationHideableSectionComponent = /** @class */ (function (_super) {
        __extends(NavigationHideableSectionComponent, _super);
        function NavigationHideableSectionComponent(changeDetectorRef) {
            var _this = _super.call(this, changeDetectorRef) || this;
            _this.isCollapsed = false;
            return _this;
        }
        NavigationHideableSectionComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            if (this.model.hiddenByDefault.getValue() === true) {
                this.hideSection();
            }
        };
        NavigationHideableSectionComponent.prototype.getModel = function () {
            return this.model;
        };
        NavigationHideableSectionComponent.prototype.hideSection = function () {
            this.model.isHidden = true;
        };
        NavigationHideableSectionComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ehr-navigation-hideable-section',
                        template: "<div class=\"navigation-hideable-section\" [ngClass]=\"{'is-hidden': model.isHidden, 'active': activeNode}\" id=\"id-{{model.getId()}}\">\r\n    <div class=\"header\">\r\n        <div class=\"corner\"></div>\r\n        <span class=\"label\">\r\n            <span class=\"label-text\">\r\n                {{model.getDescription()}}\r\n            </span>\r\n        </span>\r\n        <span class=\"label-end-position-holder\">\r\n            <span class=\"clear\" (click)=\"hideSection()\">\r\n                <sc-svg-icon type=\"close\" size=\"s\"></sc-svg-icon>\r\n            </span>\r\n        </span>\r\n\r\n    </div>\r\n    <div class=\"content\">\r\n        <div class=\"slot-container\" *ngFor=\"let slot of model.getSlots()\">\r\n            <ehr-root-slot class=\"slot\"\r\n                           [reload]=\"reloadId\"\r\n                           [component]=\"slot.getComponent()\"\r\n                           [model]=\"slot\"></ehr-root-slot>\r\n        </div>\r\n    </div>\r\n</div>\r\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [":host .navigation-hideable-section{background-color:#fafafa;border:1px dashed #ccc;border-radius:4px;display:flex;flex-direction:column}:host .navigation-hideable-section.is-hidden{display:none}:host .navigation-hideable-section.active{border:1px dashed #ffe066}:host .navigation-hideable-section.active .header .corner:before{content:''}:host .navigation-hideable-section ::ng-deep .navigation-hideable-section,:host .navigation-hideable-section ::ng-deep .navigation-section{background-color:#fafafa}:host .navigation-hideable-section ::ng-deep .navigation-hideable-section .navigation-hideable-section,:host .navigation-hideable-section ::ng-deep .navigation-hideable-section .navigation-section,:host .navigation-hideable-section ::ng-deep .navigation-section .navigation-hideable-section,:host .navigation-hideable-section ::ng-deep .navigation-section .navigation-section{background-color:#fff}:host .navigation-hideable-section ::ng-deep .navigation-hideable-section .navigation-hideable-section .navigation-hideable-section,:host .navigation-hideable-section ::ng-deep .navigation-hideable-section .navigation-hideable-section .navigation-section,:host .navigation-hideable-section ::ng-deep .navigation-hideable-section .navigation-section .navigation-hideable-section,:host .navigation-hideable-section ::ng-deep .navigation-hideable-section .navigation-section .navigation-section,:host .navigation-hideable-section ::ng-deep .navigation-section .navigation-hideable-section .navigation-hideable-section,:host .navigation-hideable-section ::ng-deep .navigation-section .navigation-hideable-section .navigation-section,:host .navigation-hideable-section ::ng-deep .navigation-section .navigation-section .navigation-hideable-section,:host .navigation-hideable-section ::ng-deep .navigation-section .navigation-section .navigation-section{background-color:#fafafa}:host .header{align-items:center;background-color:transparent;border-bottom:0;display:flex;padding:16px}:host .header .corner{border-radius:4px 0 0;display:block;position:absolute;overflow:hidden;top:0;left:0;height:24px;width:24px}:host .header .corner:before{border:24px solid transparent;border-left:24px solid #ffe066;display:block;height:0;left:0;position:absolute;top:-24px;width:0}:host .content{display:flex;flex-direction:column;margin:0 16px}:host .content .slot-container{margin-bottom:16px}:host .label-container{align-items:center;display:flex;margin-right:16px;position:relative;z-index:5}:host .label-end-position-holder{margin-left:auto}:host .clear{border-bottom:0;cursor:pointer;display:block;opacity:.5;color:#269999}:host .clear:hover{opacity:1}:host .clear sc-svg-icon{display:block}:host .label{align-items:center;display:flex;margin-right:16px;position:relative;z-index:5}:host .label-text{color:#000;font-size:18px;font-weight:600;line-height:24px}"]
                    }] }
        ];
        /** @nocollapse */
        NavigationHideableSectionComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef }
            ];
        };
        NavigationHideableSectionComponent.propDecorators = {
            model: [{ type: core.Input }],
            isCollapsed: [{ type: core.Input }]
        };
        NavigationHideableSectionComponent = __decorate([
            rendererAngular.AssignModel(NavigationHideableSection),
            __metadata("design:paramtypes", [core.ChangeDetectorRef])
        ], NavigationHideableSectionComponent);
        return NavigationHideableSectionComponent;
    }(NavigationSectionComponent));

    var NavigationContentsComponent = /** @class */ (function () {
        function NavigationContentsComponent(changeDetectorRef) {
            this.changeDetectorRef = changeDetectorRef;
            this.nestingLevel = 0;
            this.unsubscriber = new rxjs.Subscription();
        }
        NavigationContentsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.unsubscriber.add(this.model.getViewSettings().sectionToggled.subscribe(function () {
                _this.changeDetectorRef.detectChanges();
            }));
            this.model.getViewSettings().activeNodeChangedEvent.on(this.onActiveNodeChanged.bind(this));
        };
        NavigationContentsComponent.prototype.ngOnDestroy = function () {
            this.unsubscriber.unsubscribe();
            this.model.getViewSettings().activeNodeChangedEvent.off(this.onActiveNodeChanged.bind(this));
        };
        NavigationContentsComponent.prototype.getItemName = function (sectionNode) {
            return sectionNode.section.getDescription();
        };
        NavigationContentsComponent.prototype.isButtonVisible = function (node) {
            return node.section.hasHideableSections;
        };
        NavigationContentsComponent.prototype.onAction = function (slot, actionID) {
            slot.getActions()
                .find(function (action) { return action.id === actionID; })
                .action();
            this.changeDetectorRef.detectChanges();
        };
        NavigationContentsComponent.prototype.hasNestingLevel = function (node) {
            return node.children &&
                node.children.length &&
                this.model.nestingLevels.getValue() > this.nestingLevel;
        };
        NavigationContentsComponent.prototype.scrollTo = function (node) {
            document.querySelector("#id-" + node.section.getId()).scrollIntoView({ behavior: 'smooth' });
            this.model.getViewSettings().setSectionAsActive(node);
            this.model.getViewSettings().preventScroll = true;
        };
        NavigationContentsComponent.prototype.isSectionHideable = function (node) {
            return node.section instanceof NavigationHideableSection;
        };
        NavigationContentsComponent.prototype.isSectionHidden = function (node) {
            return this.isSectionHideable(node) && node.section.isHidden;
        };
        NavigationContentsComponent.prototype.toggleHideableSection = function (node) {
            node.section.toggleHiddenState();
        };
        NavigationContentsComponent.prototype.isNodeActive = function (node) {
            return node === this.activeNode;
        };
        NavigationContentsComponent.prototype.onActiveNodeChanged = function (activeNode) {
            if (this.activeNode !== activeNode) {
                this.activeNode = activeNode;
                this.changeDetectorRef.detectChanges();
            }
        };
        NavigationContentsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ehr-navigation-contents',
                        template: "<div class=\"content-item\" *ngFor=\"let node of sectionNodes\" >\r\n    <div class=\"content-item__wrapper\" *ngIf=\"!isSectionHidden(node)\">\r\n        <div class=\"content-item__wrapper_name\"\r\n             [ngClass]=\"{'is-active': activeNode === node}\"\r\n             (click)=\"scrollTo(node)\">\r\n            {{ node.section.getDescription() }}\r\n        </div>\r\n        <ng-container *ngIf=\"isSectionHideable(node)\">\r\n            <div class=\"content-item__remove\"  (click)=\"toggleHideableSection(node)\">\r\n                <sc-svg-icon type=\"close\" size=\"s\"></sc-svg-icon>\r\n            </div>\r\n        </ng-container>\r\n\r\n        <ehr-navigation-contents class=\"content-item__wrapper_contents\" *ngIf=\"hasNestingLevel(node)\"\r\n                                 [model]=\"model\"\r\n                                 [sectionNodes]=\"node.children\"\r\n                                 [nestingLevel]=\"nestingLevel + 1\">\r\n\r\n        </ehr-navigation-contents>\r\n    </div>\r\n    <div class=\"content-item__button\" *ngIf=\"isButtonVisible(node)\" (click)=\"model.getViewSettings().toggleSectionHiddenContents(node.section)\">\r\n        <sc-svg-icon *ngIf=\"model.getViewSettings().currentSectionWithHiddenContent !== node.section\" type=\"plus\" size=\"s\"></sc-svg-icon>\r\n        <sc-svg-icon *ngIf=\"model.getViewSettings().currentSectionWithHiddenContent === node.section\" type=\"chevron-left\" size=\"s\"></sc-svg-icon>\r\n\r\n    </div>\r\n</div>\r\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [":host{flex:1;overflow:auto;z-index:31;background-color:#fff}.content-item{cursor:pointer;display:flex;font-size:15px;font-weight:600;line-height:24px;list-style-type:none;position:relative}.content-item__wrapper{width:100%}.content-item__wrapper_name{padding:8px 48px 8px 24px}.content-item__wrapper_name.is-active{background-color:#fff5b3}.content-item__wrapper .content-item__wrapper:hover>.content-item__remove{opacity:1}.content-item .content-item{font-weight:400}.content-item .content-item .content-item__wrapper{width:100%}.content-item .content-item .content-item__wrapper:hover{background-color:#e9f4f4}.content-item .content-item .content-item__wrapper_name{padding:4px 24px 4px 40px}.content-item__remove{display:flex;justify-content:center;height:32px;left:0;opacity:0;position:absolute;top:0;width:32px}.content-item__remove:hover{background-color:#dfefef}.content-item__remove:hover>sc-svg-icon{font-size:32px;opacity:1}.content-item__remove>sc-svg-icon{color:#269999;font-size:32px;opacity:.7}.content-item__button{align-items:center;background-color:#ebf8f8;border-radius:16px;cursor:pointer;display:flex;flex:0 0 32px;justify-content:center;margin:0 8px;text-align:center;width:32px}.content-item__button>sc-svg-icon{color:#269999;opacity:.7}.content-item__button:hover{background-color:#d7f0f0}"]
                    }] }
        ];
        /** @nocollapse */
        NavigationContentsComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef }
            ];
        };
        NavigationContentsComponent.propDecorators = {
            sectionNodes: [{ type: core.Input }],
            nestingLevel: [{ type: core.Input }],
            model: [{ type: core.Input }]
        };
        return NavigationContentsComponent;
    }());

    var NavigationHiddenContentsComponent = /** @class */ (function () {
        function NavigationHiddenContentsComponent() {
            this.hiddenSections = [];
        }
        NavigationHiddenContentsComponent.prototype.ngOnChanges = function () {
            this.formHiddenSections();
        };
        NavigationHiddenContentsComponent.prototype.toggleHideableSection = function (section) {
            section.toggleHiddenState();
        };
        NavigationHiddenContentsComponent.prototype.formHiddenSections = function () {
            var _this = this;
            this.hiddenSections.length = 0;
            this.sectionNodes.forEach(function (node) {
                if (node.section === _this.model.getViewSettings().currentSectionWithHiddenContent) {
                    node.children.forEach(function (child) {
                        if (child.section instanceof NavigationHideableSection && child.section.isHidden) {
                            _this.hiddenSections.push(child.section);
                        }
                    });
                }
            });
        };
        NavigationHiddenContentsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ehr-navigation-hidden-contents',
                        template: "<div class=\"header\">\r\n    <div class=\"header__title\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0443\u0436\u043D\u044B\u0435 \u0440\u0430\u0437\u0434\u0435\u043B\u044B \u043E\u0441\u043C\u043E\u0442\u0440\u0430</div>\r\n    <span class=\"header__close\" (click)=\"model.getViewSettings().closeSectionHiddenContents()\">\r\n        <sc-svg-icon type=\"close\" size=\"s\"></sc-svg-icon>\r\n    </span>\r\n</div>\r\n<div class=\"content\">\r\n    <div class=\"section\">\r\n        <li class=\"section__item\" (click)=\"toggleHideableSection(section)\"\r\n             *ngFor=\"let section of hiddenSections\">\r\n            <div class=\"section__item-inner\">\r\n                <sc-svg-icon type=\"plus\" size=\"s\"></sc-svg-icon>\r\n                {{section.getDescription()}}\r\n            </div>\r\n        </li>\r\n    </div>\r\n</div>\r\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [":host{background-color:#fff;border-right:1px solid #ccc;display:flex;flex-direction:column;height:100%;left:calc(100% + 1px);overflow:auto;position:absolute;top:0;width:312px;z-index:30}:host .header{align-items:flex-start;border-bottom:1px solid #ccc;display:flex;flex:0 0 auto;justify-content:space-between;padding:16px}:host .header__title{color:#333;font-size:15px;line-height:24px}:host .header__close{color:#777;cursor:pointer;height:32px;width:32px}:host .header__close>sc-svg-icon{font-size:32px}:host .header__close:hover{color:#474747}:host .content{flex:1 1 auto;height:100%;overflow:auto}:host .section{padding:0 16px}:host .section__header{display:flex;font-size:15px;font-weight:600;line-height:16px;margin-bottom:8px;padding:8px 8px 8px 0;white-space:nowrap}:host .section__item{display:flex;margin-top:8px}:host .section__item:not(:last-child){margin-bottom:8px}:host .section__item-inner{background-color:#e9f4f4;border-radius:16px;cursor:pointer;font-size:15px;font-weight:400;display:inline-flex;line-height:16px;padding:8px 16px 8px 8px;white-space:nowrap}:host .section__item-inner>sc-svg-icon{color:#269999;margin:0 8px 0 4px;width:16px;line-height:normal}"]
                    }] }
        ];
        NavigationHiddenContentsComponent.propDecorators = {
            sectionNodes: [{ type: core.Input }],
            model: [{ type: core.Input }]
        };
        return NavigationHiddenContentsComponent;
    }());

    var ViewSettings = /** @class */ (function () {
        function ViewSettings() {
            this.sectionToggled = new rxjs.Subject();
            this.activeNode = null;
            this.activeNodeChangedEvent = new renderer.Event();
            this.preventScroll = false;
        }
        ViewSettings.prototype.openSectionHiddenContents = function (section) {
            this.currentSectionWithHiddenContent = section;
        };
        ViewSettings.prototype.closeSectionHiddenContents = function () {
            this.currentSectionWithHiddenContent = null;
        };
        ViewSettings.prototype.toggleSectionHiddenContents = function (section) {
            if (section === this.currentSectionWithHiddenContent) {
                this.closeSectionHiddenContents();
            }
            else {
                this.openSectionHiddenContents(section);
            }
            this.sectionToggled.next(section);
        };
        ViewSettings.prototype.onScroll = function (event, sectionNodes) {
            if (this.preventScroll) {
                return;
            }
            var allNodesWithOffsets = this.composeNodesWithOffsets(event, sectionNodes)
                .sort(function (a, b) { return b.offset - a.offset; });
            // Вычисляем высоту скролла
            var numberOfViewPorts = (event.target.scrollHeight - event.target.offsetHeight) / event.target.offsetHeight;
            var currenPercentage = (event.target.scrollTop / event.target.offsetHeight) / numberOfViewPorts;
            var scrollBoundary = event.target.offsetHeight * currenPercentage;
            // Ищем раздел, который должен быть активен
            var currentNodeWithOffset = allNodesWithOffsets
                .find(function (el) { return el.offset < scrollBoundary; }) || allNodesWithOffsets[allNodesWithOffsets.length - 1];
            this.setSectionAsActive(currentNodeWithOffset.sectionNode);
        };
        ViewSettings.prototype.composeNodesWithOffsets = function (event, sectionNodes, result) {
            var _this = this;
            if (result === void 0) {
                result = [];
            }
            sectionNodes.map(function (el) {
                if (el.children.length) {
                    _this.composeNodesWithOffsets(event, el.children, result);
                }
                result.push({
                    offset: document.getElementById("id-" + el.section.getId()).getBoundingClientRect().top - event.target.getBoundingClientRect().top,
                    sectionNode: el
                });
            });
            return result;
        };
        ViewSettings.prototype.setSectionAsActive = function (node) {
            this.activeNode = node;
            this.activeNodeChangedEvent.trigger(this.activeNode);
        };
        return ViewSettings;
    }());

    var SectionNode = /** @class */ (function () {
        function SectionNode() {
        }
        return SectionNode;
    }());
    var Navigation = /** @class */ (function (_super) {
        __extends(Navigation, _super);
        function Navigation(context) {
            var _this = _super.call(this, context) || this;
            _this.context = context;
            _this.nestingLevels = _this.property({
                key: 'nestingLevels',
                title: 'Количество уровней влооженности',
                type: renderer.EditorType.Number,
                defaultValue: 1
            });
            _this.nodes = _this.property({
                key: 'nodes',
                title: 'Навигация',
                type: renderer.EditorType.Any,
                metadata: undefined
            });
            _this.viewSettings = new ViewSettings();
            return _this;
        }
        Navigation.prototype.init = function () {
            _super.prototype.init.call(this);
            if (!this.slots.length) {
                this.add();
            }
            this.cachedSectionNodes = this.buildSectionRecursive(this.getSlots());
        };
        Navigation.prototype.createElement = function () {
            return renderer.ElementNode.create({ type: renderer.BasicSlot.className, library: this.node.getLibrary(), version: this.node.getVersion() });
        };
        Navigation.prototype.createSlot = function (context) {
            return new renderer.BasicSlot(context);
        };
        Navigation.prototype.getTitle = function () {
            return 'Навигация по разделам';
        };
        Navigation.prototype.getSections = function () {
            return this.cachedSectionNodes;
        };
        Navigation.prototype.getViewSettings = function () {
            return this.viewSettings;
        };
        Navigation.prototype.raiseChanged = function (component, child) {
            _super.prototype.raiseChanged.call(this, component, this);
            if (component.getNode().getType() === NavigationHideableSection.className || component.getNode().getType() === NavigationSection.className) {
                this.cachedSectionNodes = this.buildSectionRecursive(this.getSlots());
                this.onUpdated().trigger({ component: component });
            }
        };
        Navigation.prototype.buildEditor = function (builder) {
            _super.prototype.buildEditor.call(this, builder);
            builder
                .group('Группа полей 1')
                .property(this.nestingLevels.getSetting())
                .close();
        };
        Navigation.prototype.buildSectionRecursive = function (elements, parent) {
            var _this = this;
            if (!elements || !elements.length)
                return;
            var nodes = [];
            elements.forEach(function (element) {
                var node;
                if (element instanceof NavigationSection) {
                    node = new SectionNode();
                    node.section = element;
                    node.children = [];
                    node.section.hasHideableSections = false;
                    if (parent) {
                        parent.children.push(node);
                        if (element instanceof NavigationHideableSection) {
                            parent.section.hasHideableSections = true;
                        }
                    }
                    nodes.push(node);
                }
                var children = element.getChildren();
                if (children && children.length) {
                    var childNodes = _this.buildSectionRecursive(children, node || parent);
                    if (!nodes.length) {
                        nodes = childNodes;
                    }
                    else if (!node) {
                        nodes = __spread(nodes, childNodes);
                    }
                }
            });
            return nodes;
        };
        Navigation.className = 'Navigation';
        return Navigation;
    }(renderer.BaseSlotContainer));

    // tslint:disable:only-arrow-functions
    function slideAnimation() {
        return animations.trigger('slideAnimation', [
            animations.transition(':enter', [
                animations.style({
                    transform: 'translateX(-90%)'
                }),
                animations.animate('120ms ease-in', animations.style({
                    transform: 'translateX(0%)'
                }))
            ]),
            animations.transition(':leave', [
                animations.animate('100ms ease-in', animations.style({
                    transform: 'translateX(-90%)'
                }))
            ])
        ]);
    }

    var NavigationComponent = /** @class */ (function (_super) {
        __extends(NavigationComponent, _super);
        function NavigationComponent(changeDetectorRef) {
            var _this = _super.call(this, changeDetectorRef) || this;
            _this.hiddenContentsOpened = false;
            return _this;
        }
        NavigationComponent.prototype.onScroll = function (event) {
            this.model.getViewSettings().onScroll(event, this.getSectionNodes());
            this.changeDetectorRef.detectChanges();
            return true;
        };
        NavigationComponent.prototype.onMouseWheel = function () {
            this.model.getViewSettings().preventScroll = false;
        };
        NavigationComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
        };
        NavigationComponent.prototype.getSectionNodes = function () {
            return this.model.getSections();
        };
        NavigationComponent.prototype.getModel = function () {
            return this.model;
        };
        NavigationComponent.decorators = [
            { type: core.Component, args: [{
                        animations: [slideAnimation()],
                        selector: 'ehr-navigation',
                        template: "<div class=\"menu\">\r\n    <ehr-navigation-contents [model]=\"model\"\r\n                             [sectionNodes]=\"getSectionNodes()\">\r\n    </ehr-navigation-contents>\r\n    <ehr-navigation-hidden-contents\r\n        [@slideAnimation]\r\n        [model]=\"model\"\r\n        [sectionNodes]=\"getSectionNodes()\"\r\n        *ngIf=\"model.getViewSettings().currentSectionWithHiddenContent\">\r\n    </ehr-navigation-hidden-contents>\r\n</div>\r\n<div class=\"container\" (scroll)=\"onScroll($event)\">\r\n    <div class=\"slot-container\" *ngFor=\"let slot of model.getSlots()\">\r\n        <ehr-root-slot [reload]=\"reloadId\" class=\"slot\"\r\n                       [component]=\"slot.getComponent()\"\r\n                       [model]=\"slot\"></ehr-root-slot>\r\n    </div>\r\n</div>\r\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [":host{display:flex;flex:1 1 auto;height:100%;position:relative;z-index:20}:host .menu{display:flex;position:relative;width:312px}:host .container{border-left:1px solid #ccc;flex:3;overflow-y:auto;padding:24px 64px 0 16px}:host .slot-container{margin-bottom:8px}"]
                    }] }
        ];
        /** @nocollapse */
        NavigationComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef }
            ];
        };
        NavigationComponent.propDecorators = {
            model: [{ type: core.Input }],
            onScroll: [{ type: core.HostListener, args: ['scroll', ['$event'],] }],
            onMouseWheel: [{ type: core.HostListener, args: ['wheel',] }]
        };
        NavigationComponent = __decorate([
            rendererAngular.AssignModel(Navigation),
            __metadata("design:paramtypes", [core.ChangeDetectorRef])
        ], NavigationComponent);
        return NavigationComponent;
    }(rendererAngular.BasicComponent));

    var UserTemplate = /** @class */ (function (_super) {
        __extends(UserTemplate, _super);
        function UserTemplate(context) {
            return _super.call(this, context, renderer.ElementType.Component) || this;
        }
        /**
         * Проинициализировать интерфейс для доступа к данным
         * @param {UserTemplateContract} client
         */
        UserTemplate.prototype.setClient = function (client) {
            this.client = client;
            this.tryInitialize();
        };
        /**
         * Информация для тулбара
         * @returns {string}
         */
        UserTemplate.prototype.getTitle = function () {
            return 'Шаблон пользователя';
        };
        UserTemplate.prototype.getUserTemplates = function () {
            return this.userTemplates || [];
        };
        UserTemplate.prototype.load = function (dataContext) {
            _super.prototype.load.call(this, this.dataContext);
            this.tryInitialize();
        };
        UserTemplate.prototype.create = function (name) {
            var _this = this;
            if (!name)
                return;
            this.setLoading(true);
            var userTemplate = {
                id: renderer.Guid.newGuid(),
                name: name,
                parts: this.getParts()
            };
            this.client.save(userTemplate).subscribe(function (c) {
                _this.appliedUserTemplate = userTemplate;
                _this.userTemplates.push(userTemplate);
                _this.setLoading(false);
            });
        };
        UserTemplate.prototype.delete = function (id) {
            var _this = this;
            this.setLoading(true);
            this.client.delete(id).subscribe(function (c) {
                if (_this.appliedUserTemplate && _this.appliedUserTemplate.id === id) {
                    _this.appliedUserTemplate = undefined;
                }
                if (_this.userTemplates) {
                    _this.userTemplates = _this.userTemplates.filter(function (c) { return c.id !== id; });
                }
                _this.setLoading(false);
            });
        };
        UserTemplate.prototype.update = function (userTemplate) {
            var _this = this;
            if (!userTemplate)
                return;
            userTemplate.parts = this.getParts();
            this.setLoading(true);
            this.client.save(userTemplate).subscribe(function (c) {
                _this.appliedUserTemplate = userTemplate;
                _this.userTemplates = _this.userTemplates.filter(function (c) { return c.id !== userTemplate.id; });
                _this.userTemplates.push(userTemplate);
                _this.setLoading(false);
            });
        };
        UserTemplate.prototype.getAppliedUserTemplate = function () {
            return this.appliedUserTemplate;
        };
        UserTemplate.prototype.apply = function (id) {
            var _this = this;
            this.setLoading(true);
            this.client.getTemplateContent(id).subscribe(function (details) {
                if (details && details.parts) {
                    details.parts.forEach(function (part) { return _this.applyPart(part); });
                    _this.client.log(details.id).subscribe(function (x) { });
                    _this.appliedUserTemplate.counter++;
                    _this.appliedUserTemplate = details;
                }
                _this.setLoading(false);
            });
        };
        UserTemplate.prototype.tryInitialize = function () {
            var _this = this;
            if (!this.client)
                return;
            if (this.userTemplates && !this.dataContext)
                return;
            var refs = this.getTemplateRefs();
            if (!refs || refs.length === 0)
                return;
            this.setLoading(true);
            this.client.getTemplates(refs).subscribe(function (userTemplates) {
                _this.userTemplates = userTemplates ? __spread(userTemplates) : [];
                _this.setLoading(false);
            });
        };
        UserTemplate.prototype.setLoading = function (value) {
            this.loading = value;
            this.onValueUpdated().trigger();
        };
        UserTemplate.prototype.getTemplateRefs = function () {
            var owner = this.getOwningWidget();
            var dataContext = owner.getDataContext();
            // todo: переписать
            if (dataContext instanceof renderer.ArchetypeDataContext) {
                var archetypeDataContext = dataContext;
                return [{
                        templateId: archetypeDataContext.getTemplateIds()[0],
                        path: archetypeDataContext.getNode().getPath()
                    }];
            }
            else if (dataContext instanceof renderer.CompositionDataContext) {
                var compositionDataContext = dataContext;
                return compositionDataContext.getCompositions().map(function (composition) {
                    return ({
                        templateId: composition.getTemplateId(),
                        path: composition.getNode().getPath()
                    });
                });
            }
            return [];
        };
        UserTemplate.prototype.getParts = function () {
            var owner = this.getOwningWidget();
            var dataContext = owner.getDataContext();
            var fromBasicTypes = [];
            this.findBasicTypesRecursive(owner, fromBasicTypes);
            var archetypes = [];
            // todo: убрать этот if
            if (dataContext instanceof renderer.ArchetypeDataContext) {
                var archetypeDataContext = dataContext;
                archetypes.push(archetypeDataContext.getArchetype());
            }
            else if (dataContext instanceof renderer.CompositionDataContext) {
                var compositionDataContext = dataContext;
                compositionDataContext.getCompositions().forEach(function (composition) { return archetypes.push(composition); });
            }
            var parts = [];
            archetypes.forEach(function (archetype) {
                var webTemplate = archetype.getTemplate();
                var openEhrObject = new openEhrLibrary.OpenEhrObjectImpl(webTemplate, {});
                fromBasicTypes = fromBasicTypes.filter(function (c) { return !c.empty() && !c.isDeleted(); });
                fromBasicTypes.forEach(function (basicType) {
                    var assigned = openEhrObject.getByPath(basicType.getPath());
                    assigned.assign(basicType);
                    assigned.save();
                });
                parts.push({
                    templateId: webTemplate.templateId,
                    path: archetype.getNode().getPath(),
                    content: openEhrObject.getData()
                });
            });
            return parts;
        };
        UserTemplate.prototype.applyPart = function (part) {
            var owner = this.getOwningWidget();
            var dataContext = owner.getDataContext();
            if (dataContext.getTemplateIds().indexOf(part.templateId) < 0)
                return;
            var toArchetype;
            // todo: убрать этот if
            if (dataContext instanceof renderer.ArchetypeDataContext) {
                var archetypeDataContext = dataContext;
                toArchetype = archetypeDataContext.getArchetype();
            }
            else if (dataContext instanceof renderer.CompositionDataContext) {
                var compositionDataContext = dataContext;
                var composition = compositionDataContext.getCompositions().find(function (c) { return c.getTemplateId() === part.templateId; });
                toArchetype = composition;
            }
            var openEhrObject = new openEhrLibrary.OpenEhrObjectImpl(toArchetype.getTemplate(), part.content);
            var fromBasicTypes = [];
            this.findArchetypeBasicTypesRecursive(openEhrObject.get(toArchetype.getNode().getPath()), fromBasicTypes);
            fromBasicTypes = fromBasicTypes.filter(function (c) { return !c.empty() && !c.isDeleted(); });
            fromBasicTypes.forEach(function (basicType) {
                var assigned = toArchetype.getByPath(basicType.getPath());
                assigned.assign(basicType);
            });
            owner.load(dataContext);
        };
        UserTemplate.prototype.findBasicTypesRecursive = function (element, result) {
            var _this = this;
            var props = element.getProperties();
            Object.keys(props).filter(function (code) { return props[code] && props[code].sources; }).forEach(function (code) {
                props[code].sources.forEach(function (bindingSource) {
                    var source = bindingSource.getSourceProperty();
                    if (source instanceof openEhrLibrary.RmProperty) {
                        var basicType = source.getObject();
                        result.push(basicType);
                    }
                    else if (source instanceof openEhrLibrary.RmCollectionProperty) {
                        var collectionProperty = source.getObjects();
                        result.push.apply(result, __spread(collectionProperty));
                    }
                });
            });
            element.getRuntimeChildren().forEach(function (c) { return _this.findBasicTypesRecursive(c, result); });
        };
        UserTemplate.prototype.findArchetypeBasicTypesRecursive = function (complexType, result) {
            var _this = this;
            var childNodes = complexType.getNode().getChildren();
            if (!childNodes)
                return;
            childNodes.forEach(function (childNode) {
                var children = complexType.getMany(childNode.getId());
                if (children) {
                    children.forEach(function (child) {
                        var node = child.getNode();
                        if (node.getChildren() && node.getChildren().length > 0) {
                            _this.findArchetypeBasicTypesRecursive(child, result);
                        }
                        else {
                            result.push(child);
                        }
                    });
                }
            });
        };
        UserTemplate.prototype.getOwningWidget = function () {
            var parent = this.getParent();
            while (parent && parent.getParent() && parent.elementType !== renderer.ElementType.Widget) {
                parent = parent.getParent();
            }
            return parent;
        };
        UserTemplate.className = 'UserTemplate';
        return UserTemplate;
    }(renderer.BindableComponent));

    var UserTemplateService = /** @class */ (function () {
        function UserTemplateService(http$$1) {
            this.http = http$$1;
            this.data = [];
        }
        UserTemplateService.prototype.getTemplates = function (locations) {
            return rxjs.of(this.data);
        };
        UserTemplateService.prototype.getTemplateContent = function (id) {
            return rxjs.of(this.data.find(function (c) { return c.id === id; }));
        };
        UserTemplateService.prototype.save = function (userTemplate) {
            this.data.push(userTemplate);
            return rxjs.of(userTemplate);
        };
        UserTemplateService.prototype.log = function (id) {
            this.data.find(function (c) { return c.id === id; }).counter++;
            return rxjs.of(this.data);
        };
        UserTemplateService.prototype.delete = function (id) {
            this.data = this.data.filter(function (c) { return c.id !== id; });
            return rxjs.of(this.data);
        };
        UserTemplateService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        UserTemplateService.ctorParameters = function () {
            return [
                { type: http.HttpClient }
            ];
        };
        return UserTemplateService;
    }());

    var UserTemplateComponent = /** @class */ (function (_super) {
        __extends(UserTemplateComponent, _super);
        function UserTemplateComponent(changeDetectorRef, userTemplateService) {
            var _this = _super.call(this, changeDetectorRef) || this;
            _this.userTemplateService = userTemplateService;
            _this.editMode = false;
            _this.unsubscribe$ = new rxjs.Subject();
            return _this;
        }
        Object.defineProperty(UserTemplateComponent.prototype, "templates", {
            get: function () {
                return this.model.getUserTemplates();
            },
            enumerable: true,
            configurable: true
        });
        UserTemplateComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.textField = new forms.FormControl();
            this.textField.valueChanges.pipe(operators.takeUntil(this.unsubscribe$))
                .subscribe(function (value) { _this.name = value; });
            this.model.setClient(this.userTemplateService);
        };
        UserTemplateComponent.prototype.apply = function (id) {
            this.model.apply(id);
        };
        UserTemplateComponent.prototype.cancel = function () {
            this.editMode = false;
            this.selectedDetails = undefined;
            this.changeDetectorRef.detectChanges();
        };
        UserTemplateComponent.prototype.createNew = function () {
            this.edit(undefined);
        };
        UserTemplateComponent.prototype.edit = function (details) {
            this.editMode = true;
            this.selectedDetails = details;
            this.name = this.selectedDetails ? this.selectedDetails.name : '';
            this.textField.setValue(this.name);
            this.changeDetectorRef.detectChanges();
        };
        UserTemplateComponent.prototype.isSelected = function (id) {
            return this.selectedDetails && id === this.selectedDetails.id;
        };
        UserTemplateComponent.prototype.create = function () {
            if (!this.name)
                return;
            this.model.create(this.name);
            this.editMode = false;
            this.selectedDetails = undefined;
            this.changeDetectorRef.detectChanges();
        };
        UserTemplateComponent.prototype.update = function () {
            if (!this.selectedDetails)
                return;
            this.selectedDetails.name = this.name;
            this.model.update(this.selectedDetails);
            this.editMode = false;
            this.selectedDetails = undefined;
            this.changeDetectorRef.detectChanges();
        };
        UserTemplateComponent.prototype.delete = function (id) {
            this.model.delete(id);
        };
        UserTemplateComponent.prototype.ngOnDestroy = function () {
            this.unsubscribe$.next(true);
            this.unsubscribe$.complete();
        };
        UserTemplateComponent.prototype.getModel = function () {
            return this.model;
        };
        UserTemplateComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ehr-user-template',
                        template: "<p>\r\n    \u0427\u0417\u0420/\u0427\u0417\u041F\r\n</p>\r\n<div *ngFor=\"let template of templates\">\r\n    <span [ngClass]=\"{'selected': isSelected(template.id)}\" (click)=\"apply(template.id)\">{{ template.name }}</span>\r\n    <span (click)=\"edit(template)\" class=\"idvp-ui-kit-font pen\"></span>\r\n    <span (click)=\"delete(template.id)\" class=\"idvp-ui-kit-font trash\"></span>\r\n</div>\r\n<div>\r\n    <span *ngIf=\"!selectedDetails && !editMode\" (click)=\"createNew()\">\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u0448\u0430\u0431\u043B\u043E\u043D</span>\r\n    <input *ngIf=\"editMode\" class=\"input\" type=\"text\" placeholder=\"\u041D\u0430\u0437\u0432\u0430\u0435\u043D\u0438\u0435 \u0448\u0430\u0431\u043B\u043E\u043D\u0430\" [formControl]=\"textField\" />\r\n    <span *ngIf=\"!selectedDetails && editMode\" (click)=\"create()\">\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D</span>\r\n    <span *ngIf=\"selectedDetails && editMode\" (click)=\"update()\">\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D</span>\r\n    <span *ngIf=\"editMode\" (click)=\"cancel()\">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</span>\r\n</div>\r\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [":host{z-index:20}.selected{font-weight:700}.input{display:block;margin:0;padding:4px 8px;border:1px solid #ddd;background:#fff}"]
                    }] }
        ];
        /** @nocollapse */
        UserTemplateComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef },
                { type: UserTemplateService }
            ];
        };
        UserTemplateComponent.propDecorators = {
            model: [{ type: core.Input }]
        };
        UserTemplateComponent = __decorate([
            rendererAngular.AssignModel(UserTemplate),
            __metadata("design:paramtypes", [core.ChangeDetectorRef, UserTemplateService])
        ], UserTemplateComponent);
        return UserTemplateComponent;
    }(rendererAngular.BasicComponent));

    var NavigationLibrary = /** @class */ (function (_super) {
        __extends(NavigationLibrary, _super);
        function NavigationLibrary() {
            var _this = _super.call(this, NavigationLibrary.info) || this;
            _this.types = {};
            var navigation = _this.createNavigation.bind(_this);
            _this.types[openEhrLibrary.RmType.COMPOSITION] = [navigation];
            return _this;
        }
        NavigationLibrary.getInstance = function () {
            if (!NavigationLibrary.instance) {
                NavigationLibrary.instance = new NavigationLibrary();
            }
            return NavigationLibrary.instance;
        };
        NavigationLibrary.prototype.getComponents = function () {
            return [Navigation, NavigationSection, NavigationHideableSection, UserTemplate, Messenger];
        };
        NavigationLibrary.prototype.getToolbarGroups = function () {
            return [
                {
                    title: this.getLibraryName(),
                    elements: [
                        this.build(Navigation).result(),
                        this.build(NavigationSection).result(),
                        this.build(NavigationHideableSection).result(),
                        this.build(UserTemplate).result(),
                        this.build(Messenger).result()
                    ],
                },
            ];
        };
        NavigationLibrary.prototype.createComponents = function (node) {
            if (this.types[node.rmType] === undefined)
                return undefined;
            return this.types[node.rmType].map(function (c) { return c(node); });
        };
        NavigationLibrary.prototype.createNavigation = function (node) {
            var navigationComp = this.create(Navigation);
            this.createNavigationSections(this.filterChildNodes(node.childNodes), navigationComp);
            return navigationComp;
        };
        NavigationLibrary.prototype.createNavigationSections = function (childNodes, navigationComp, nestingLevel) {
            var _this = this;
            if (nestingLevel === void 0) {
                nestingLevel = 1;
            }
            childNodes.forEach(function (node) {
                // Шаг 1. Берем последний слот у текущего компонента навигации
                var navSlot = _this.getFirstEmptySlot(navigationComp);
                // Шаг 2. Создаем секцию навигации
                var navSection;
                var elementContext;
                var libElement = {
                    type: NavigationSection.className,
                    library: _this.getInfo().code,
                    version: _this.getInfo().version
                };
                if (nestingLevel > 0) {
                    libElement.type = NavigationSection.className;
                    elementContext = new renderer.ElementContext(renderer.ElementNode.create(libElement), navSlot);
                    navSection = new NavigationSection(elementContext);
                }
                else { // Шаг 2.1. Если это последний уровень, то создаем скрываемую секцию
                    libElement.type = NavigationHideableSection.className;
                    elementContext = new renderer.ElementContext(renderer.ElementNode.create(libElement), navSlot);
                    navSection = new NavigationHideableSection(elementContext);
                }
                navSection.bindingPath.setValue(node.path);
                // Шаг 3. Устанавливаем название секции
                navSection.title.setValue(node.name);
                // Шаг 4. Кладем секцию в созданный выше (на шаге 1) слот
                navSlot.putComponent(navSection);
                // Шаг 5. Берем дочерние ноды
                var filteredChildNodes = _this.filterChildNodes(node.childNodes);
                // Шаг 6. Если дочерняя нода одна или мы достигли лимита вложенности
                if (filteredChildNodes.length === 1 || nestingLevel === 0) {
                    // filteredChildNodes.forEach((childNode: ArchetypeNode) => { Закомментировал цикл. Не используются дочерние ноды, поэтому не бегаем по ним
                    // Шаг 6.1. Формируем компонент с внутренней структурой и кладем его в первый слот секции навигации
                    var widgetRef = renderer.SystemLibrary.getInstance().create(renderer.WidgetRefComponent);
                    widgetRef.bindingPath.setValue(node.path);
                    _this.getFirstEmptySlot(navSection).putComponent(widgetRef);
                }
                else {
                    // Шаг 6.2. Иначе выполняем алгоритм для каждой из дочерних нод, начиная с шага 1
                    _this.createNavigationSections(filteredChildNodes, navSection, nestingLevel - 1);
                }
            });
        };
        /**
         * Возвращяает последний пустой слот или создает новый слот и возвращает его
         * @param {BaseSlotContainer} container
         * @returns {Slot}
         */
        NavigationLibrary.prototype.getFirstEmptySlot = function (container) {
            var slot = container.getSlots().slice(-1)[0];
            if (!slot || slot.getComponent()) {
                // Если слота нет или он непустой, то добавляем новый слот
                slot = container.add();
            }
            return slot;
        };
        /**
         * Отфильтровываем служебные поля, которые не нужны на форме
         * @param {ArchetypeNode[]} childNodes
         * @returns {ArchetypeNode[]}
         */
        NavigationLibrary.prototype.filterChildNodes = function (childNodes) {
            if (!childNodes)
                return [];
            var ignoredSections = ['context', 'category', 'language', 'territory', 'time', 'encoding', 'subject', 'composer', '_link', '_uid', '_other_participation'];
            return childNodes.filter(function (el) { return !ignoredSections.find(function (ignored) { return ignored === el.id; }); });
        };
        NavigationLibrary.info = { code: 'emias-lib', title: 'Библиотека ЕМИАС', version: '0.1' };
        NavigationLibrary.instance = undefined;
        return NavigationLibrary;
    }(renderer.BaseLibrary));

    var factoryFunction = function () {
        return function () {
            renderer.ElementFactory.getInstance().registerLibrary(new NavigationLibrary());
        };
    };
    var NavigationLibraryModule = /** @class */ (function () {
        function NavigationLibraryModule() {
        }
        NavigationLibraryModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            http.HttpClientModule,
                            rendererAngular.RendererAngularModule,
                            forms.ReactiveFormsModule,
                            uiKit.UiKitModule,
                        ],
                        declarations: [
                            NavigationComponent,
                            NavigationContentsComponent,
                            NavigationSectionComponent,
                            NavigationHideableSectionComponent,
                            NavigationHiddenContentsComponent,
                            UserTemplateComponent,
                            MessengerComponent
                        ],
                        exports: [
                            NavigationComponent,
                            NavigationContentsComponent
                        ],
                        entryComponents: [NavigationComponent, NavigationSectionComponent, NavigationHideableSectionComponent, UserTemplateComponent, MessengerComponent],
                        providers: [
                            {
                                provide: core.APP_INITIALIZER,
                                multi: true,
                                deps: [],
                                useFactory: factoryFunction,
                            },
                            UserTemplateService
                        ]
                    },] }
        ];
        return NavigationLibraryModule;
    }());

    /*
     * Public API Surface of core
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ɵn = Messenger;
    exports.ɵo = MessengerComponent;
    exports.ɵh = NavigationHideableSectionComponent;
    exports.ɵf = NavigationSectionComponent;
    exports.ɵc = slideAnimation;
    exports.ɵe = NavigationContentsComponent;
    exports.ɵj = NavigationHiddenContentsComponent;
    exports.ɵb = NavigationComponent;
    exports.ɵl = UserTemplate;
    exports.ɵk = UserTemplateComponent;
    exports.ɵm = UserTemplateService;
    exports.ɵd = Navigation;
    exports.ɵi = NavigationHideableSection;
    exports.ɵa = factoryFunction;
    exports.ɵg = NavigationSection;
    exports.NavigationLibrary = NavigationLibrary;
    exports.NavigationLibraryModule = NavigationLibraryModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ehr-forms-navigation-library-angular.umd.js.map
