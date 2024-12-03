// OOP - תכנות מונחה עצמים
// גאוה סקריפט מאפשרת יצירת עצמים אבל לא מאפשרת יצירת מחלקות

// new Number(10) - number ctor
// 10 - literal number

// 1. literal object - מציין את השדות באופן מפורש, בתוך צומדים
// בין שדה לשדה מפריד פסיק
const p1 = { id: 111, name: 'miri', city: 'elad' };

const firstName = "guest", city = "bb";
const p2 = {
    firstName: 'dani',
    lastName: 'cohen',
    age: 20,
    print: function () { // old method
        // ברירת מחדל מחפש מחוץ לאוביקט
        console.log(firstName, city); // guest bb
        // console.log(age); // ReferenceError: age is not defined

        // this אם נרצה לגשת לתכונות האוביקט ניגש עם
        console.log(this.firstName, this.age);
    },
    getFullName() { // ES6 method
        return `${this.firstName} ${this.lastName}`
    },
    get FullName() {
        return `${this.firstName} ${this.lastName}`
    },
    set FullName(val) {
        const [f, l] = val.split(' ');
        this.firstName = f;
        this.lastName = l;
    }
};

p2.print();
console.log(p2.firstName);
p2.country = "Israel"; // הוספת תכונות לאוביקט
console.log(p2.getFullName());
console.log(p2.FullName); // get
p2.FullName = "david levi"; // set
console.log(p2.firstName);

// בד"כ נעבוד עם אוביקט ליטרלי
// ואת המחלקה ניצור בשרת

// 2. object ctor - בנאי של אובגקט
// לעולם לא נשתמש בשיטה זו
// כי היא נחשבת מאוד בזבזנית מבחינת זיכרון
// וגם אין השלמות אוטומטיות
const p3 = new Object(); // אוביקט ריק בלי תכונות ופעולות
p3.name = "moshe"; // הוספת תכונות לאוביקט
p3.age = 15;
// p3.get FullName = function(){}; // לא ניתן
p2.country = "Israel"; // הוספת תכונות לאוביקט כי היא לא קיימת
p3.print = function (msg) {
    // this = p3 - print לפי מי שזימנו עליו את הפונקציה
    console.log(msg, this.name, this.age);
};
p3.errPrint = (msg) => {
    // אם יוצרים פונקצית חץ באוביקט
    // this לא ניתן לגשת ל
    console.log(msg, this.age);
};

p3.print("hello"); // hello moshe 15
p3.errPrint("bye"); // bye undefined

console.log('='.repeat(50));

// 3. Constructor Function - פונקצית בנאי
// JS-תחליף למחלקה ב
// מגדירה תבנית לאוביקטים - object blueprint
function Person(firstName, lastName, age = 20) {
    // new כאשר מפעילים את הפונקציה עם
    // this שולח אוביקט ריק בתור
    // this = {}

    // משתנה פרטי - ניתן לגשת רק בתוך הבנאי
    // ובתוך הפונקציות הפנימיות
    let id = Person.prototype.count++; // private
    const creationDate = new Date(); // private readonly

    // console.log(firstName, lastName, age);
    // console.log(this);

    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.fullName = firstName + " " + lastName;

    // רק בתוך פונקצית בנאי ניתן להשתמש בפונקצית חץ
    this.printFullName = () => {
        console.log(creationDate);

        // this. כדי לגשת לתכונות האוביקט המוחזר ניגש עם
        // ייגש לפרמטר שקיבלנו this אם לא נכתוב
        return firstName + " " + this.lastName; // firstName - ערך התחלתי שנשלח, lastName - הערך שמתוך הזיס
        // return this.firstName + " " + this.lastName;
    };

    // הגדרת מאפיין על זיס
    // FullName שם המאפיין כמחרוזת
    // פרמטר שלישי - אוביקט שיכול להכיל פונקציות גט וסט
    Object.defineProperty(this, "FullName", {
        get() {
            return (this.firstName + " " + this.lastName).toUpperCase();
        },
        set(f) {
            this.firstName = this.lastName = f;
        }
    })

    Object.defineProperty(this, "ID", {
        get() { return id; }
    });



    // this-מחזיר אוטומטית את ה
    // Person מסוג
}

// prototype - אוביקט בסיס לכל האוביקטים שנוצרו ע"י הבנאי של פרסון
// מכיל בתוכו תכונות/פונקציות משותפות לכל הפרסונים

// הפונקציה מוגדרת פעם אחת וכולם יכולים לגשת אליה
Person.prototype.printAll = function () {
    // this - האוביקט שעליו הפעלתי את הפונקציה
    // this ניתן לגשת רק ל
    // לא ניתן לגשת לתכונות פרטיות
    console.log(this.firstName, this.lastName, this.age);
};

Person.prototype.count = 100; // סטטי

// Person("abc", "bbb"); // abc bbb 20
// Person("abc", "bbb", 30); // abc bbb 30

// const p4 = Person("abc", "bbb", 30);// abc bbb 30
// console.log(p4); // undefined

const p5 = new Person("abc", "bbb", 30); // this החזיר את
// { firstName: 'bbb', lastName: 'ccc', age: 30, fullName: 'abc bbb', printFullName()  }
console.log(p5);
console.log(p5.fullName); // abc bbb
p5.firstName = "bbb";
p5.lastName = "ccc";
console.log(p5.firstName); // bbb
console.log(p5.fullName); // abc bbb
console.log(p5.printFullName()); // abc ccc

p5.FullName = "levi";
console.log(p5.FullName); // LEVI LEVI
console.log(p5.firstName, p5.lastName); // levi levi
console.log(p5.ID); // 100
p5.printAll(); // levi levi 30

const p6 = new Person();
console.log(p6.ID); // 101
console.log(p6);

// אפשרויות גישה לתכונות/פונקציות ציבוריות
// 1. עי נקודה - כך מקובל לגשת
// נשתמש בשיטה זו כאשר אפשרי
p6.firstName = "abc";
p6.address = "pt";
// p6.user.password = 1234; // שגיאה, שם של תכונה לא יכול להכיל נקודה

// 2. עי סוגריים מרובעים שבתוכם מחרוזת
p6["firstName"] = "ABC";
p6['address'] = "bb";
p6['user.password'] = 1234; // יוצר תכונה ששמה שמכיל נקודה
console.log(p6['user.password']);
p6['user-password'] = 1234; // יוצר תכונה ששמה שמכיל מקף
console.log(p6['user-password']);
p6['user password'] = 1234; // יוצר תכונה ששמה מכיל רווח
console.log(p6['user password']);

const prop = "name", prop2 = "age"//prompt("enter a property");
const obj1 = { age: 10 };
// obj.prop = "user"; // יוסיף תכונה בשם פרופ והערך שלה הוא יוזר

obj1[prop] = "user"; // אם נרצה להוסיף/לגשת לתכונה ששמה מתקבל כמחרוזת
// ניגש עם סוגריים מרובעים
console.log(obj1[prop2]);

// ES6 באוביקט ליטרלי ניתן ליצור תכונות דינאמיות
// [] ע"י
const obj2 = {
    [prop + '1']: "user",
    [prop2]: 20,
};

console.log('name' in obj1); // true
console.log('name' in obj2); // false
console.log('name1' in obj2); // true

// key - עובר על מפתחות של שמות התכונות והפונקציות
for (const key in obj2) {
    console.log(key, obj2[key]); // מדפיס מפתח וערך
}

// Object.prototype כך מוסיפים פונקציה לכל האוביקטים
Object.prototype.toString = function () {
    let str = "";
    for (const key in this) {
        if (typeof this[key] !== 'function') // אם הערך שונה מפונקציה
            str += key + ": " + this[key] + "\n";
    }
    return str;
};
console.log('===========================');

console.log(p5.toString());
console.log(obj2.toString());

const arr = Object.keys(obj2); // ['name1', 'age'] כל המפתחות
console.log(obj2[arr[0]]); // 'user'

const o1 = { a: 1, b: 2, c: 3 };
// o1 = { name: 'aaa' } // TypeError: Assignment to constant variable.
o1.a = 100;
delete o1['c']
console.log(o1); // {a: 100, b: 2}

// מקפיא את האוביקט
// כך שלא יוכלו לשנות את התכונות שלו
// לא זורק שגיאה, אלא האוביקט לא משתנה
Object.freeze(o1);
o1.b = 100;
delete o1.a;
o1.c = 123;
console.log(o1);

let o2 = { a: 10, b: 20 }, o3 = { b: 100, c: 200 };
Object.assign(o2, o3, { d: 300 });
// o2 = { a: 10, b: 20, b: 100, c: 200, d: 300 }
console.log(o2); // { a: 10, b: 100, c: 200, d: 300 }

// o2 = {...o2, ...o3, d: 300} // ניתן לכתוב בצורה מקוצרת עם שלוש נקודות ES6ב