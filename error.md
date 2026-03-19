C:\Users\Dinosaur\Komodo\Dev&Dash\Vanilla-project\script.js
  186:9  warning  'lastScrollTop' is assigned a value but never used  @typescript-eslint/no-unused-v
ars

C:\Users\Dinosaur\Komodo\Dev&Dash\app\components\About.tsx
   5:9   warning  'revealRef' is assigned a value but never used

                                                                                 @typescript-eslint/
no-unused-vars
  25:19  warning  The ref value 'elementsRef.current' will likely have changed by the time this effe
ct cleanup function runs. If this ref points to a node rendered by React, copy 'elementsRef.current'
 to a variable inside the effect, and use that variable in the cleanup function  react-hooks/exhaust
ive-deps

C:\Users\Dinosaur\Komodo\Dev&Dash\app\components\Bounties.tsx
  29:19  warning  The ref value 'elementsRef.current' will likely have changed by the time this effe
ct cleanup function runs. If this ref points to a node rendered by React, copy 'elementsRef.current'
 to a variable inside the effect, and use that variable in the cleanup function  react-hooks/exhaust
ive-deps

C:\Users\Dinosaur\Komodo\Dev&Dash\app\components\Highlights.tsx
    4:8   warning  'Image' is defined but never used


@typescript-eslint/no-unused-vars
   27:19  warning  The ref value 'elementsRef.current' will likely have changed by the time this eff
ect cleanup function runs. If this ref points to a node rendered by React, copy 'elementsRef.current
' to a variable inside the effect, and use that variable in the cleanup function
react-hooks/exhaustive-deps
  100:15  warning  Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<I
mage />` from `next/image` or a custom image loader to automatically optimize images. This may incur
 additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element
@next/next/no-img-element
  116:15  warning  Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<I
mage />` from `next/image` or a custom image loader to automatically optimize images. This may incur
 additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element
@next/next/no-img-element
  132:15  warning  Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<I
mage />` from `next/image` or a custom image loader to automatically optimize images. This may incur
 additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element
@next/next/no-img-element
  148:15  warning  Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<I
mage />` from `next/image` or a custom image loader to automatically optimize images. This may incur
 additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element
@next/next/no-img-element

C:\Users\Dinosaur\Komodo\Dev&Dash\app\components\Marquee.tsx
   5:15  error  Comments inside children section of tag should be placed inside braces  react/jsx-no
-comment-textnodes
  11:15  error  Comments inside children section of tag should be placed inside braces  react/jsx-no
-comment-textnodes

C:\Users\Dinosaur\Komodo\Dev&Dash\app\components\RegistrationModal.tsx
  11:49  error  Error: Cannot call impure function during render

`Date.now` is an impure function. Calling an impure function can produce unstable results that updat
e unpredictably when the component happens to re-render. (https://react.dev/reference/rules/componen
ts-and-hooks-must-be-pure#components-and-hooks-must-be-idempotent).

C:\Users\Dinosaur\Komodo\Dev&Dash\app\components\RegistrationModal.tsx:11:49
   9 |
  10 | export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
> 11 |   const [members, setMembers] = useState([{ id: Date.now(), name: "" }]);
     |                                                 ^^^^^^^^^^ Cannot call impure function
  12 |   const [isSubmitting, setIsSubmitting] = useState(false);
  13 |   const [showSuccess, setShowSuccess] = useState(false);
  14 |  react-hooks/purity

? 13 problems (3 errors, 10 warnings)

?ELIFECYCLE? Command failed with exit code 1.