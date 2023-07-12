
class Group {
	constructor() {
		this.collection = [];
		this.length = 0;
	}

	add(item) {
		this.collection.push(item);
		this.length++;
	}

	remove(index) {
		if (index < this.length) {
			this.collection.splice(index, 1);
			this.length--;
		}
	}

	empt() {
		this.collection.length = 0;
		this.length = 0;
	}

	each(action, asc) {
		var asc = asc || 0,
			i;
		if (asc) {
			for(i = 0; i < this.length; i++) {
				this.collection[i][action](i);
			}
		} else {
			i = this.length;
			while(i--) {
				this.collection[i][action](i);
			}
		}
	}
}
