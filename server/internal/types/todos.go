package types

type Todo struct {
	Title   string `json:"title"`
	Content string `json:"content"`
	TodoID  uint   `json:"todo_id"`
}
