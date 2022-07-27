type Currency = 'ARS' | 'USD';

interface Price{
    number:number,
    currency:Currency
}

interface ExpenseItem{
    id:number,
    title:string,
    cost:Price
}

interface IExpenses{
    expenses:ArrayList<ExpenseItem>
    FinalCurrency: Currency,
    add(item:ExpenseItem): boolean,
    get(index:number):ExpenseItem|null,
    getTotal():string,
    remove(id:number):boolean

}

class ArrayList<T>{
    private items:T[];

    constructor(){
        this.items = [];
    }

    add(item:T):void {
        this.items.push(item)
    }

    get(index:number):T|null{
        const item:T[] = this.items.filter( (x:T, i:number) =>{
            return i === index;
        });
        
        if(item.length === 0){
            return null;
        }else{
            return item [0];
        }
    }

    createFrom(value:T[]):void{
        this.items = [...value];
    }

    getALL():T[]{
        return this.items;
    }
}

class Expenses implements IExpenses{
    expenses: ArrayList<ExpenseItem>;
    FinalCurrency: Currency;

    private count = 0;

    constructor(currency:Currency){
        this.FinalCurrency = currency;
        this.expenses = new ArrayList<ExpenseItem>();
    }
    add(item: ExpenseItem): boolean {
        item.id = this.count;
        this.count++;
        this.expenses.add(item)
        return true;
    }
    get(index:number): ExpenseItem | null {
        return this.expenses.get(index);
    }
    getItems():ExpenseItem[]{
        return this.expenses.getALL();
    }
    getTotal(): string {
        const total = this.getItems().reduce( (acc, item) =>{
            return acc += this.convertCurrency(item, this.FinalCurrency);
        }, 0);

        return `${this.FinalCurrency} $${total.toFixed(2).toString}`
    }
    remove(id: number): boolean {
        throw new Error("Method not implemented.");
    }

    private convertCurrency(item:ExpenseItem, currency:Currency):number{
        switch(item.cost.currency){
            case 'USD':
                switch(currency){
                    case 'ARS':
                        return item.cost.number * 327;
                    break;
                    
                    default:
                        return item.cost.number;
                }
                break;

                case 'ARS':
                    switch(currency){
                        case 'USD':
                            return item.cost.number / 327;
                        break;
                        
                        default:
                            return item.cost.number;
                    }
                break;
                
                default:
                    return 0;
        }
    }
    
}


