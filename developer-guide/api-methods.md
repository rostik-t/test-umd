# API Methods

Following methods may be used while working with forms:

Please include header with token: `X-AUTHENTICATION-TOKEN`: \(token should be requested from EHR Forms product owner\)

{% api-method method="get" host="" path="/api/template/{ id }" %}
{% api-method-summary %}
Get Template
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
Template ID
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-headers %}
{% api-method-parameter name="X-AUTHENTICATION-TOKEN" type="string" required=true %}
Authentication token
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="" path="/api/form/{ id }" %}
{% api-method-summary %}
Get form
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
id format is \[GUID\]:\[version\]. Pass only GUID in request if you want to get the highest form version
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-headers %}
{% api-method-parameter name="X-AUTHENTICATION-TOKEN" type="string" required=true %}
Authentication token
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="" path="/api/composition/convert" %}
{% api-method-summary %}
Convert composition
{% endapi-method-summary %}

{% api-method-description %}
Input parameters are:  
- composition
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="templateId" type="string" required=true %}
Template ID
{% endapi-method-parameter %}

{% api-method-parameter name="formatTo" type="string" required=true %}
Can be one of the following:   
- CanonicalXml,   
- CanonicalJson,   
- StructuredJSON,   
- Flat \(in development\),   
- BpFlat,   
- TDD \(in development\)
{% endapi-method-parameter %}

{% api-method-parameter name="formatFrom" type="string" required=true %}
Can be one of the following:   
- CanonicalXml,   
- CanonicalJson,   
- StructuredJSON,   
- Flat \(in development\),   
- BpFlat,   
- TDD \(in development\)
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-headers %}
{% api-method-parameter name="X-AUTHENTICATION-TOKEN" type="string" required=true %}
Authentication token
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-body-parameters %}
{% api-method-parameter name="composition" type="string" required=true %}
openEHR Composition in \[formatFrom\] format
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

