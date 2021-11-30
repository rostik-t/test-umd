# API Methods

Following methods may be used while working with forms:

Please include header with token: `X-AUTHENTICATION-TOKEN`: (token should be requested from EHR Forms product owner)

{% swagger baseUrl="" path="/api/template/{ id }" method="get" summary="Get Template" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="string" %}
Template ID
{% endswagger-parameter %}

{% swagger-parameter in="header" name="X-AUTHENTICATION-TOKEN" type="string" %}
Authentication token
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="" path="/api/form/{ id }" method="get" summary="Get form" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="string" %}
id format is [GUID]:[version]. Pass only GUID in request if you want to get the highest form version
{% endswagger-parameter %}

{% swagger-parameter in="header" name="X-AUTHENTICATION-TOKEN" type="string" %}
Authentication token
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="" path="/api/composition/convert" method="post" summary="Convert composition" %}
{% swagger-description %}
Input parameters are:

\


\- composition
{% endswagger-description %}

{% swagger-parameter in="path" name="templateId" type="string" %}
Template ID
{% endswagger-parameter %}

{% swagger-parameter in="path" name="formatTo" type="string" %}
Can be one of the following: 

\


\- CanonicalXml, 

\


\- CanonicalJson, 

\


\- StructuredJSON, 

\


\- Flat (in development), 

\


\- BpFlat, 

\


\- TDD (in development)
{% endswagger-parameter %}

{% swagger-parameter in="path" name="formatFrom" type="string" %}
Can be one of the following: 

\


\- CanonicalXml, 

\


\- CanonicalJson, 

\


\- StructuredJSON, 

\


\- Flat (in development), 

\


\- BpFlat, 

\


\- TDD (in development)
{% endswagger-parameter %}

{% swagger-parameter in="header" name="X-AUTHENTICATION-TOKEN" type="string" %}
Authentication token
{% endswagger-parameter %}

{% swagger-parameter in="body" name="composition" type="string" %}
openEHR Composition in [formatFrom] format
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
```
{% endswagger-response %}
{% endswagger %}
